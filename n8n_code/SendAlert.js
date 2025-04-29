const fs = require('fs');

/**
 * Check if the message is valid.
 */
function call($json){
  const messageType = $json.message;
  console.log('Sending alert', messageType);
  return [{
      json:{
          message:"ok",
          type:messageType
      }
  }];
}

module.exports = {
    call
}