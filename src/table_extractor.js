var pdf_table_extractor = require("pdf-table-extractor");


class PDFTable {
  constructor(pdfPath) {
    this.pdfPath = pdfPath;
  }
  set pdfData(pdfData) {
    this.pdfData = pdfData;
  }
  get pdfData() {
    return this.pdfData;
  }

  //PDF parsed
  PDFParseSuccess(result)
  {
     this.jsonData = result;
  }

  //Error
  PDFParseError(err)
  {
     console.error('Error: ' + err);
  }

  parsePDF() {
    pdf_table_extractor(this.pdfPath, PDFParseSuccess, PDFParseError);
  }
}

exports.PDFTable = PDFTable; 
