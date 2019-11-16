const PDFTable = require('./table_extractor');
const uuidv3 = require('uuid/v3');
const moment = require('moment');
const ical = require('ical-generator');

const namespace = '02683ace-a292-4391-9839-095de3d3724b';

const dateregex = /\d+\.\d+\.\d.../


let pdfExtractor = new PDFTable('./listat/kelloton.pdf');

let workingData;

class WorkData {
  constructor(jsonD) {
    this.rawData = jsonD;
    this.people = {};
  }

  processRaw() {
     // console.log(this.rawData.pageTables[0].tables[0][0].match(dateregex)[0])
      this.startdate = moment(this.rawData.pageTables[0].tables[0][0].match(dateregex)[0], "D.M.YYYY");

      this.people.names = this.rawData.pageTables[0].tables.slice(3).map(c => c[0]);
      this.people.uuids =  this.rawData.pageTables[0].tables.slice(3).map(c => uuidv3(c[0], namespace));
      this.people.calendars = this.rawData.pageTables[0].tables.slice(3).map(c => ical({domain: 'localhost', name: 'Work Shifts'}));

      this.abbreviations = {}

      this.rawData.pageTables[2].tables.slice(3).forEach((table, pix) => {
          //console.log(table[0])
          let match = table[0].slice(26).match(/ - \d+:\d+/)
          let endIdx = match.index + match[0].length
          let parsed = table[0].slice(26).substring(0, endIdx - 1).split(/(\d\d:.*$)/)
          let times = parsed[1].split(" - ")
          this.abbreviations[parsed[0].toUpperCase()] = {
              start: times[0],
              end: times[1]
          }

          console.log(parsed)
      })

      this.rawData.pageTables.slice(0, -1).forEach((page, pix) => {
          page.tables.slice(3).forEach((table, tix) => {
              //console.log(table, "--:--", pix, tix)
              table.slice(1).forEach((day, dix) => {
                  let pday = day.trim();
                  if(pday != "" && !/\d+:\d/.test(pday)) { //Tests if the table content is empty or the sum of work hours(e.g 127:0)
                      let daydate = moment(this.startdate).add(dix+21*pix, 'days')
                      this.people.calendars[tix].createEvent({
                            start: daydate,
                            end: daydate.add(2, 'hour'),
                            summary: pday,
                            description: 'It works ;)',
                            url: 'localhost'
                        });
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
