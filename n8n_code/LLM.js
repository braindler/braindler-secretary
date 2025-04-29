const text = $json.message;
if($node['Documents'].json === null){
  return [{
    json:{
      message:"Ошибка, попробуйте позже",
      error: "Ошибка в Node `Documents`"
    }
  }]
}
let answer = $node['Documents'].json[0].message;
if(answer==="document added"|| answer==="document deleted" || answer==="document not found"){
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