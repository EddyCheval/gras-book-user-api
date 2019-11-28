const responseJson = {
  '404': {
    description: 'Not found',
    examples: {
      'application/json': {
        statusCode: 'id.not.found',
        error: 'No Match Found',
        message: 'No match found'
      }
    }
  }
};

module.exports = responseJson;
