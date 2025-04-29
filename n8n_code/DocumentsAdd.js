const { addDocument } = require('./DocumentsHelper');

/**
 * Add document to file.
 */
function call($json){
  let result = addDocument($json.document);

  return [{
    json: {
      message: result
    }
  }];
}

module.exports = {
  call
}