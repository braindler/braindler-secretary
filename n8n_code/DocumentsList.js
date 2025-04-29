const { readDocuments } = require('./DocumentsHelper');

/**
 * Get list of documents
 */
function call($json){
  let documents = readDocuments();

  return [{
    json: {
      message: documents
    }
  }];
}

module.exports = {
  call
};
