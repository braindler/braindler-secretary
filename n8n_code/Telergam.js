const fs = require('fs');

/**
 * Send message to telegram.
 */
function call($json){
  const message = $json.message;
  if(!message){
    console.log('No message to send to telegram');
  }
  console.log('Sending message to Telegram:', message);
  return [{
      json:{
          message:"telegram",
          text:message
      }
  }];
}

module.exports = {
    call
};
