const responseJson = {
  '500': {
    description: 'Internal Server Error',
    examples: {
      'application/json': {
        statusCode: 'internal.server.error',
        error: 'Internal Server Error',
        message: 'Something went wrong'
      }
    }
  }
};

module.exports = responseJson;
