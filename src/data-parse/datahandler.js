const PDFTable = require('./table_extractor');

let pdfExtractor = new PDFTable('../../listat/kelloton.pdf');

pdfExtractor.parsePDF().then((data) => {new WorkData(data)});

function processRaw(rawData) {
    let data = {}
    data.people = rawData[0].tables.slice(3).map(c => c[0]);

    
    console.log(data.people);
}

class WorkData {
  constructor(jsonD) {
    this.rawData = jsonD;
    this.data = processRaw(this.rawData.pageTables);
  }
}
