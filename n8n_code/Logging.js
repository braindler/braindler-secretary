const fs = require('fs');

/**
 * Write message in log file.
 */
function call($json){
  const logMessage = $json.message;
  fs.appendFile('log.txt', logMessage + '\n', (err) => {
    if (err) throw err;
  });
  return [{
      json:{
          message:"ok"
      }
  }];
}

module.exports = {
    call
};