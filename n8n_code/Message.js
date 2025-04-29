const fs = require('fs');

/**
 * Check if the message is valid.
 */
function call($json){
  const messageType = $json.message;
  if(!messageType){
    console.log('Message is empty!');
  }
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