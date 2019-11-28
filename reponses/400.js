const responseJson = {
  '400': {
    description: 'Bad Request',
    examples: {
      'application/json': [
        {
          statusCode: 'column.not.found',
          error: 'Bad Request',
          message: 'Invalid column name'
        },
        {
          statusCode: 'unique.constraint.violation',
          error: 'Bad Request',
          message: 'Unique key violation'
        }
      ]
    }
  }
};

module.exports = responseJson;
