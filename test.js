var pdf_table_extractor = require("pdf-table-extractor");

//PDF parsed
function PDFParseSuccess(result)
{
   console.log(JSON.stringify(result));
}

//Error
function PDFParseError(err)
{
   console.error('Error: ' + err);
}

pdf_table_extractor("./listat/kelloton.pdf", PDFParseSuccess, PDFParseError);
