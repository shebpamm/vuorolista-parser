"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pdf_table_extractor = require("pdf-table-extractor");

var PDFTable = function () {
  function PDFTable(pdfPath) {
    _classCallCheck(this, PDFTable);

    this.pdfPath = pdfPath;
  }

  _createClass(PDFTable, [{
    key: "PDFParseSuccess",


    //PDF parsed
    value: function PDFParseSuccess(result) {
      this.jsonData = result;
    }

    //Error

  }, {
    key: "PDFParseError",
    value: function PDFParseError(err) {
      console.error('Error: ' + err);
    }
  }, {
    key: "parsePDF",
    value: function parsePDF() {
      pdf_table_extractor(this.pdfPath, PDFParseSuccess, PDFParseError);
    }
  }, {
    key: "pdfData",
    set: function set(pdfData) {
      this.pdfData = pdfData;
    },
    get: function get() {
      return this.pdfData;
    }
  }]);

  return PDFTable;
}();

exports.PDFTable = PDFTable;