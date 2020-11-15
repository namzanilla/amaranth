module.exports = {
  isEmptyObject,
  isPlainObject,
};

function isEmptyObject(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}

function isPlainObject(obj) {
  return	typeof obj === 'object'
    && obj !== null
    && obj.constructor === Object
    && Object.prototype.toString.call(obj) === '[object Object]';
}
