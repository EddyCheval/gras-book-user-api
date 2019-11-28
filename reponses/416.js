const responseJson = {
  '416': {
    description: 'Range not statisfiable',
    examples: {
      'application/json': {
        statusCode: 'invalid.range',
        error: 'Range Not Satisfiable',
        message: 'Range not satisfiable'
      }
    }
  }
};

module.exports = responseJson;
