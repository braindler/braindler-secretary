// Get alert type from context
/**
 * Check alert cases and log them.
 */
const alertType = $node['Metrics'].context.get('alertType');
// Clear alert type in context
$node['Metrics'].context.set('alertType', null);
// Check if alert type exist
if(alertType){
  // Check alert type and log it
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