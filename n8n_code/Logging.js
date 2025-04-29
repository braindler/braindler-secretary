const request = $json.message;
const response = $json.message;
const error = $json.error;

console.log("Request:", request);
console.log("Response:", response);
if(error){
  console.error("Error:", error);
}

return [{
    json: {
      message: $json.message
    }
}];