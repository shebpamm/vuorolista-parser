const PDFTable = require('./table_extractor');
const uuidv3 = require('uuid/v3');
const moment = require('moment');
const ical = require('ical-generator');

const namespace = '02683ace-a292-4391-9839-095de3d3724b';

const dateregex = /\d+\.\d+\.\d.../


let pdfExtractor = new PDFTable('./listat/new_kelloton.pdf');

let workingData;

class WorkData {
  constructor(jsonD) {
    this.rawData = this.mergeTables(jsonD);
    this.people = {};
  }

  /* So this fuction is pretty much a hack.
  As I first thought the pdfs would be always 3 pages long, the code is pretty biased.
  It turns out, if there are more than 15 employees it expands the rest to a new page.
  This function basically merges all the partial pages to one huge table. */
  mergeTables(jsonD) {
      let numPages = jsonD.numPages;
      if(numPages == 3) return jsonD;

      let rawData =
      {
          numPages: 3,
          pageTables : [
              { page: 1,
                  tables : [],
              },
              { page: 2,
                  tables : [],
              },
              { page: 3,
                  tables : [],
              }
          ]
      }



      for (const [i, page] of jsonD.pageTables.entries()) {
          if(i != numPages - 1) {
              if (i < (numPages - 1) / 2) {
                  if(i == 0) rawData.pageTables[0].tables.push(...page.tables)
                  else rawData.pageTables[0].tables.push(...page.tables.slice(3))
              }
              if (i >= (numPages - 1) / 2) {
                  if(i == (numPages - 1) / 2) rawData.pageTables[1].tables.push(...page.tables)
                  else rawData.pageTables[1].tables.push(...page.tables.slice(3))
              }
          }
      }

      rawData.pageTables[2].tables = jsonD.pageTables[numPages - 1].tables
      //console.log(rawData.pageTables[1])
      return rawData
  }

  processRaw() {
     // console.log(this.rawData.pageTables[0].tables[0][0].match(dateregex)[0])
      this.startdate = moment(this.rawData.pageTables[0].tables[0][0].match(dateregex)[0], "D.M.YYYY");

      this.people.names = this.rawData.pageTables[0].tables.slice(3).map(c => c[0].replace("\n", " "));
      this.people.uuids =  this.rawData.pageTables[0].tables.slice(3).map(c => uuidv3(c[0], namespace));
      this.people.calendars = this.rawData.pageTables[0].tables.slice(3).map(c => ical({domain: 'localhost', name: 'Work Shifts', timezone: 'Europe/Helsinki'}));

      this.abbreviations = {}

      this.rawData.pageTables[2].tables.slice(3).forEach((table, pix) => {
          //console.log(table[0])
          let match = table[0].slice(26).match(/ - \d+:\d+/)
          let endIdx = match.index + match[0].length
          let parsed = table[0].slice(26).substring(0, endIdx - 1).split(/(\d\d:.*$)/)
          let times = parsed[1].split(" - ")
          this.abbreviations[parsed[0].toUpperCase()] = {
              start: times[0].padEnd(5, "0"),
              end: times[1].padEnd(5, "0")
          }

          //console.log(parsed)
      })

      this.rawData.pageTables.slice(0, -1).forEach((page, pix) => {
          page.tables.slice(3).forEach((table, tix) => {
              //console.log(table, "--:--", pix, tix)
              table.slice(1).forEach((day, dix) => {
                  let pday = day.trim();
                  if(pday != "" && !/\d+:\d/.test(pday)) { //Tests if the table content is empty or the sum of work hours(e.g 127:0)
                      let daydate = moment(this.startdate).add(dix+21*pix, 'days')

                      let abb = this.abbreviations[pday.toUpperCase().replace('*', '')]

                      if (abb != undefined) {


                          const [startH, startM] = abb.start.split(':');
                          const [endH, endM] = abb.end.split(':');

                          let startdate = moment(daydate).set({'hour' : startH, 'minute' : startM })
                          let enddate = moment(daydate).set({'hour' : endH, 'minute' : endM })

                          if(endH < startH) enddate.add(1, 'day')

                          this.people.calendars[tix].createEvent({
                              start: startdate.toDate(),
                              end: enddate.toDate(),
                              summary: pday,
                              description: 'WIP',
                              url: 'localhost'
                          });
                      }
                  }
              })
          })
      })

      this.workers = this.people.names.map((n, i) => {
          return {
                    name : n,
                    uuid: this.people.uuids[i],
                    calendar: this.people.calendars[i]
                };
      });
     /* this.rawData.pageTables.forEach((page) => {


          page.tables.slice(2).forEach((table, tix) => {
              this.workers[tix].shifts = table.slice(1).map((shift) => {
                  s = shift.split(" ")
                  return {}
              })
          })
      })*/
  }
}

module.exports = pdfExtractor.parsePDF()
    .then((data) => {workingData = new WorkData(data)})
    .then(() => workingData.processRaw())
    .then(() => workingData);
