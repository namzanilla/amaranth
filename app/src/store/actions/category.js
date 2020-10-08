import * as at from 'store/actionTypes';
import {getCategoryBrandTree} from 'api/category';

export const fetchCategoryBrandTree = (languageId) => (dispatch) => {
  getCategoryBrandTree(languageId).then((res) => {
    const {data: payload} = res;

    dispatch(setCategoryBrandTree(payload));
  });
};

export const setCategoryBrandTree = (payload) => (dispatch) => {
  dispatch({
    type: at.CATEGORY_SET_BRAND_TREE,
    payload,
  });
};
