const responseJson = json => ({
  '206': {
    description: 'Partial Content retrieved',
    examples: {
      'application/json': json
    }
  }
});

module.exports = responseJson;
