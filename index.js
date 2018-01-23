module.exports = function iterate(operation) {
  let source;
  return (type, data) => {
    if (type === 0) source = data;
    if (type === 1) operation(data);
    if (type === 1 || type === 0) source(1);
  };
};
