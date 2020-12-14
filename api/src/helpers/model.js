module.exports = {
  getTitle,
  getH1,
};

function getTitle(modelId, languageId, payload) {
  const {
    brandMame,
    modelName,
    priceMin,
    priceMax,
  } = payload;

  if (modelId === 1) {
    if (languageId === 1) {
      return `Купити ${brandMame}, ${modelName} від ${priceMin} до ${priceMax} грн`;
    } else if (languageId === 2) {
      return `Купить ${brandMame}, ${modelName} от ${priceMin} до ${priceMax} грн`;
    }
  } else if (modelId === 2) {
    if (languageId === 1) {
      return `Купити ${brandMame}, ${modelName} від ${priceMin} до ${priceMax} грн`;
    } else if (languageId === 2) {
      return `Купить ${brandMame}, ${modelName} от ${priceMin} до ${priceMax} грн`;
    }
  } else if (modelId === 3) {
    if (languageId === 1) {
      return `Купити ${brandMame}, ${modelName} від ${priceMin} до ${priceMax} грн`;
    } else if (languageId === 2) {
      return `Купить ${brandMame}, ${modelName} от ${priceMin} до ${priceMax} грн`;
    }
  }
}

function getH1(modelId, languageId, payload) {
  const {
    brandMame,
    modelName,
    priceMin,
    priceMax,
  } = payload;

  if (modelId === 1) {
    if (languageId === 1) {
      return `Сироватковий протеїн ${brandMame}, ${modelName} від ${priceMin} до ${priceMax} грн`;
    } else if (languageId === 2) {
      return `Сывороточный протеин ${brandMame}, ${modelName} от ${priceMin} до ${priceMax} грн`;
    }
  } else if (modelId === 2) {
    if (languageId === 1) {
      return `Вітаміни ${brandMame}, ${modelName} від ${priceMin} до ${priceMax} грн`;
    } else if (languageId === 2) {
      return `Витамины ${brandMame}, ${modelName} от ${priceMin} до ${priceMax} грн`;
    }
  } else if (modelId === 3) {
    if (languageId === 1) {
      return `Вітаміни ${brandMame}, ${modelName} від ${priceMin} до ${priceMax} грн`;
    } else if (languageId === 2) {
      return `Витамины ${brandMame}, ${modelName} от ${priceMin} до ${priceMax} грн`;
    }
  }
}
