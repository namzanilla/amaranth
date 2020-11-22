const stringHelper = require('./_String');

module.exports = {
  order: {
    generateNewHash: () => {
      return stringHelper.generateRandom({
        length: 16,
        numericDigits: true,
        lowercaseLetters: true,
        uppercaseLetters: false,
      });
    },
  },
};
