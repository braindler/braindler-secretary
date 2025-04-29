return [{
    json: {
      message: $json.message?.text|| $json.callback_query?.data
    }
  }]