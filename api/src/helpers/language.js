const LANGUAGE_UK_ID = 1;
const LANGUAGE_RU_ID = 2;

module.exports = {
  prepareLanguageIdFromQs,
  LANGUAGE_UK_ID,
  LANGUAGE_RU_ID,
};

function prepareLanguageIdFromQs(languageId) {
  languageId = parseInt(languageId) || 1;

  if (languageId !== LANGUAGE_UK_ID
    && languageId !== LANGUAGE_RU_ID) return LANGUAGE_UK_ID;

  return languageId;
}
