const {NODE_ENV} = process.env;

module.exports = {
  isDevelopment,
};

function isDevelopment() {
  return NODE_ENV === 'development';
}
