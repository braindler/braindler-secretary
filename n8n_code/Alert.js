const alertType = $node['Metrics'].context.get('alertType');
$node['Metrics'].context.set('alertType', null);
if(alertType){
  if(alertType==='5xx_error'){
    console.log('ALERT: 5xx error rate exceeded threshold!');
  } else if(alertType==='service_unavailable'){
    console.log('ALERT: Service unavailable for too long!');
  } else if (alertType === 'consecutive_errors') {
      console.log('ALERT: Too many consecutive errors from RAG/LLM!');
  }
    
  return [{
      json:{
          message:"alert",
          alert:alertType
      }
  }]
} else{
  return [{
      json:{
          message:"no alert"
      }
  }]
}