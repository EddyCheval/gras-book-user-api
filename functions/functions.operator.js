const sortByKey = (array, key, order) => {
  return array.sort((a, b) => {
    const x = a[key];
    const y = b[key];
    if (order === 'ASC') {
      return x.localeCompare(y);
    }
    return y.localeCompare(x);
  });
};

module.exports = { sortByKey };
