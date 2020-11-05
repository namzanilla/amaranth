export const productMeta2H1 = (meta) => {
  const {
    4: productBrandModel = {},
  } = meta;
  const {
    id: productBrandModelValueId,
  } = productBrandModel;

  if (productBrandModelValueId === 1) {
    const {
      1: {
        value: brand,
      } = {},
      2: {
        value: netWeightGramm,
      } = {},
      3: {
        value: flavor,
      } = {},
      4: {
        value: brandModel,
      } = {},
    } = meta;

    return `${brand}, ${brandModel} ${flavor} ${netWeightGramm}`;
  }

  return '';
};

export const productMeta2Title = (meta) => {
  return productMeta2H1(meta);
}
