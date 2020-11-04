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

export const fetchCategoryInfo = (categoryId, languageId) => async (dispatch) => {
  dispatch({type: at.CATEGORY_FETCH_INFO_REQUEST});

  const params = {
    id: categoryId,
    languageId,
  };

  try {
    const {data: info = {}} = await categoryApi.getInfoById(params);
    dispatch({type: at.CATEGORY_FETCH_INFO_SUCCESS});
    dispatch(setCategoryInfo(languageId, info));
  } catch (e) {
    dispatch({type: at.CATEGORY_FETCH_INFO_FAILURE});
    console.log(e);
  }
};

export const setCategoryInfo = (languageId, info) => (dispatch) => {
  dispatch({
    type: at.CATEGORY_SET_INFO,
    languageId,
    info,
  });
};

export const setCategoryId = (id) => (dispatch, getState) => {
  const {
    category = {},
  } = getState();

  if (id !== category.id) {
    dispatch({
      type: at.CATEGORY_SET_ID,
      id,
    });
  }
};

export const setCategoryIdByPathname = (pathname) => (dispatch) => {
  pathname = pathname.split('/');
  pathname.shift();

  if ('ru' === pathname[0] || '' === pathname[0]) {
    pathname.shift();
  }

  if (!pathname.length) return false;
  if ('c' !== pathname[0]) return false;
  if (!pathname[1]) return false;
  if (!/^\d+$/.test(pathname[1])) return false;

  const id = parseInt(pathname[1]);
  if (isNaN(id)) return false;

  dispatch(setCategoryId(id));
};

export const unsetCategoryId = () => (dispatch) => {
  dispatch({
    type: at.CATEGORY_UNSET_ID,
  });
};
