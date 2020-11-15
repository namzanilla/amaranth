import apiConnector from 'helpers/apiConnector';

export const addIntoCart = (products, token) => {
  const path = `/cart/${token}`;

  return apiConnector({
    path,
    method: 'POST',
    data: products,
  });
};

export const getCartInfo = (token) => {
  const path = `/cart/${token}`;

  return apiConnector({path});
};
