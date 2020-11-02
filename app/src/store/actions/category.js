import * as at from 'store/actionTypes';
import * as categoryApi from 'api/category';

export const fetchCategoryList = (languageId) => async (dispatch) => {
  dispatch(setCategoryListState(languageId, 'request'));

  const params = {
    group: 0,
    languageId,
  };

  try {
    const {data: list} = await categoryApi.getCategoryList(params);

    dispatch(setCategoryList(languageId, list));
    dispatch(setCategoryListState(languageId, 'success'));
  } catch (e) {
    dispatch(setCategoryListState(languageId, 'failure'));
    console.log(e);
  }
};

export const setCategoryListState = (languageId, state) => (dispatch) => {
  dispatch({
    type: at.CATEGORY_SET_LIST_STATE,
    languageId,
    state,
  });
};

export const setCategoryList = (languageId, list) => (dispatch) => {
  dispatch({
    type: at.CATEGORY_SET_LIST,
    languageId,
    list,
  });
};
