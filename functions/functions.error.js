const error404 = result => {
  if (!result) {
    const error = new Error();
    error.message = 'No match found.';
    error.code = 404;
    throw error;
  }
};

const errorCodeChange = (h, err) => {
  if (err.code !== undefined) {
    return h.response().code(err.code);
  }
  return h.response().code(500);
};

module.exports = { error404, errorCodeChange };
