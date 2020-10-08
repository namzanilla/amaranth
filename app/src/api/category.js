import apiConnector from 'helpers/apiConnector';
const path = '/category';

export const getCategoryBrandTree = (languageId) => {
  const query = `group=1&status=1&view=2&language_id=${languageId}`;

  return apiConnector({path, query});
};
