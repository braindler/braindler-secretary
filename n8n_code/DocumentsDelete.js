const { deleteDocument } = require('./DocumentsHelper');

/**
 * Delete document from file.
 */
function call($json){
  let result = deleteDocument($json.document);

  return [{
    json: {
      message: result
    }
  }];
}

module.exports = {
  call
}
