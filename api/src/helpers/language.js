const LANGUAGE_UK_ID = 1;
const LANGUAGE_RU_ID = 2;

module.exports = {
  prepareLanguageIdFromQs,
  LANGUAGE_UK_ID,
  LANGUAGE_RU_ID,
};

function prepareLanguageIdFromQs(languageId) {
  languageId = parseInt(languageId) || 1;

  if (languageId !== 1 && languageId !== 2) return 1;

  return languageId;
}
