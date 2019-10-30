var pdf_table_extractor = require("pdf-table-extractor");

const pdfextract = path => new Promise((resolve, reject) => pdf_table_extractor(path, resolve, reject));

class PDFTable {
  constructor(pdfP) {
    this.pdfPath = pdfP;
  }
  get jsonData() {
    return this._jsonData;
  }

  //PDF parsed
  PDFParseSuccess(result)
  {
     console.log(result)
     this._jsonData = result;
  }

  //Error
  PDFParseError(err)
  {
     console.error('Error: ' + err);
  }

  parsePDF() {
    return pdfextract(this.pdfPath).then(result => this._jsonData = result, err => console.error('Error: ' + err)).then(() => this._jsonData);
  }
}

module.exports = PDFTable;
