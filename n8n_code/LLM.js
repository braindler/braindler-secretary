const text = $json.message;
let answer = $node['DocumentsSearch'].json[0].message;
if(["document added", "document deleted", "document not found"].includes(answer)){
  return [{
    json:{
      message:answer
    }
  }]
} else{
  return [{
      json: {
          message: `Ответ на: ${text}\n${answer}`
      }
  }];
}