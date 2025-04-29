const fs = require('fs');

/**
 * Check for restore action.
 */
function call($json){
  const restoreType = $json.message;
  if(restoreType === "restore"){
    console.log('Restore to the previous document state');
  }
  return [{
      json:{
          message:"restore",
          restore:restoreType
      }
  }];
}

module.exports = {
    call
}