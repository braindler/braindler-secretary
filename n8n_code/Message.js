/**
 * Get text message and transform it to lower case.
 */
return [{
    json: {
      message: $json.message?.text?.toLowerCase() || $json.callback_query?.data?.toLowerCase()
    }
  }]