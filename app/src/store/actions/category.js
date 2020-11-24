import * as at from 'store/actionTypes';
import * as categoryApi from 'api/category';

export const fetchCategoryList = (languageId) => async (dispatch, getState) => {
  try {
    const state = getState();
    languageId = languageId ? languageId : state.app.languageId;

    const params = {
      group: 0,
      languageId,
    };

    dispatch({type: at.CATEGORY_FETCH_LIST_REQUEST});

    const {data: list = []} = await categoryApi.getCategoryList(params);

    dispatch({
      type: at.CATEGORY_FETCH_LIST_SUCCESS,
      list,
    });

    return list;
  } catch (e) {
    dispatch({type: at.CATEGORY_FETCH_LIST_FAILURE});

    console.log(e);
  }
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
