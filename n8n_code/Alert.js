const fs = require('fs');

/**
 * Check for too many consecutive errors.
 */
function call($json){
  const alertType = $json.message;
  if(alertType === "rag_llm_error"){
    console.log('ALERT: Too many consecutive errors from RAG/LLM!');
  }
  return [{
      json:{
          message:"alert",
          alert:alertType
      }
  }];
}

module.exports = {
    call
}