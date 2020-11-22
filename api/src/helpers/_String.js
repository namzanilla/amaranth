module.exports = {
  generateRandom,
};

function generateRandom(condition = {}) {
  const {
    length = 16,
    numericDigits = true,
    lowercaseLetters = true,
    uppercaseLetters = true,
  } = condition;

  let characters = [];

  if (numericDigits) {
    characters.push('0123456789');
  }

  if (lowercaseLetters) {
    characters.push('abcdefghijklmnopqrstuvwxyz');
  }

  if (uppercaseLetters) {
    characters.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  }

  characters = characters.join('');

  const charactersLength = characters.length;
  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
