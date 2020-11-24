const exec = require('child_process').execSync;

module.exports = {
  sleep,
};

function sleep(time) {
  return (
    (time = parseInt(time)),
      (time > 0
          ? exec(`sleep ${time}`)
          : null
      )
  );
}
