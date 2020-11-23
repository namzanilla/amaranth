import apiConnector from 'helpers/apiConnector';

export const createOrder = (data, token) => {
  const path = `/order/${token}/create`;

  return apiConnector({
    method: 'POST',
    path,
    data,
  });
};

export const getOrder = (orderId, orderHash) => {
  const path = `/order/${orderId}/${orderHash}`;

  return apiConnector({path});
};
