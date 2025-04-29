let user_id = null;
let chat_id = null;

// Если это callback_query (например, кнопка)
if ($json.callback_query) {
  user_id = $json.callback_query.from.id;
  chat_id = $json.callback_query.message.chat.id;
  $json.from=$json.callback_query.from;
}

// Если это обычное сообщение (например, команда /start)
else if ($json.message) {
  user_id = $json.message.from.id;
  chat_id = $json.message.chat.id;
  $json.from=$json.message.from;
}

return [{
  json: {    
    telegram:{
      ...$json,
      user_id,
      chat_id,
    }
  }
}];