/**
 * Get user_id and chat_id from telegram message.
 */
let user_id = null;
let chat_id = null;

// If this is callback_query (for example, button)
if ($json.callback_query) {
  user_id = $json.callback_query.from.id;
  chat_id = $json.callback_query.message.chat.id;
  $json.from=$json.callback_query.from;
}

// If this is simple message (for example /start command)
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
