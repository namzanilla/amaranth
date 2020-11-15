module.exports = {
  prepareLanguageId,
};

function prepareLanguageId(languageId) {
  languageId = parseInt(languageId);
  languageId = isNaN(languageId) ? 1 : languageId;
  languageId = languageId !== 1 && languageId !== 2 ? 1 : languageId;

  return languageId;
}
