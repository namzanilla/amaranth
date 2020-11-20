import apiConnector from 'helpers/apiConnector';

export const addIntoCart = (products, token) => {
  const path = `/cart/${token}/add`;

  return apiConnector({
    path,
    method: 'POST',
    data: products,
  });
};

export const removeFromCart = (products, token) => {
  const path = `/cart/${token}/remove`;

  return apiConnector({
    path,
    method: 'POST',
    data: products,
  });
};

export const getCartDetails = (languageId, token) => {
  const path = `/cart/${token}/details?language_id=${languageId}`;

  return apiConnector({path});
};

export const getCartInfo = (token) => {
  const path = `/cart/${token}`;

  return apiConnector({path});
};
