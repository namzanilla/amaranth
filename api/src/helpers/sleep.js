exec = require('child_process').execSync;

export const sleep = time => (
  (time = parseInt(time)),
    (time > 0
        ? exec(`sleep ${time}`)
        : null
    )
);
