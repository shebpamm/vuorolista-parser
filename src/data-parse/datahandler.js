const PDFTable = require('./table_extractor');
const uuidv3 = require('uuid/v3');
const moment = require('moment');

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

      console.log(this.rawData.pageTables[0].tables[0][0].match(dateregex)[0])
      this.startdate = moment(this.rawData.pageTables[0].tables[0][0].match(dateregex)[0], "D.M.YYYY");
      this.people.names = this.rawData.pageTables[0].tables.slice(3).map(c => c[0]);
      this.people.uuids =  this.rawData.pageTables[0].tables.slice(3).map(c => uuidv3(c[0], namespace));
      this.rawData.pageTables.forEach((page) => {
          page.tables.slice(2).forEach((table, tix) => {

          })
      })

      this.workers = this.people.names.map((n, i) => {
          return {
                    name : n,
                    uuid: this.people.uuids[i]
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
