const fs = require('fs');

/**
 * Check if error in message.
 */
function call($json){
  const messageType = $json.message;
  if(messageType === "error"){
    console.log('ALERT: message is error');
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
};