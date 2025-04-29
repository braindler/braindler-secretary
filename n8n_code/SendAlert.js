/**
 * Send alert to devops (simulation)
 */
const alert = $json.alert;
if(alert){
  console.log(`Send alert to devops about ${alert}`)
}
return [{
  json: {
      message:"Alert was sent"
  }
}]