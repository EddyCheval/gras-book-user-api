const error404 = result => {
  if (!result) {
    const error = new Error();
    error.message = 'No match found.';
    error.code = 404;
    throw error;
  }
};

module.exports = { error404 };
