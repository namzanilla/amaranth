const compose = (...fns) => x => fns.reduceRight((a, fn) => fn(a), x);
const pipe = (...fns) => x => fns.reduce((a, fn) => fn(a), x);

module.exports = {
  compose,
  pipe,
};
