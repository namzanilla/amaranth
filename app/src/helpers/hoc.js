import * as categoryApi from 'api/category';
import * as categoryActionCreators from 'store/actions/category';

export async function getHoc(props)  {
  let {
    pathname,
  } = props;
  const {
    dispatch,
    languageId,
  } = props;

  pathname = pathname.split('/');
  pathname.shift();

  if ('ru' === pathname[0] || '' === pathname[0]) {
    pathname.shift();
  }

  if (!pathname.length) return 'HomePage';

  if ('cart' === pathname[0]) {
    return 'CartPage';
  }

  if ('c' === pathname[0]) {
    if (pathname[1] && /^[1-9][0-9]*$/.test(pathname[1])) {
      const categoryId = parseInt(pathname[1]);
      const params = {
        id: categoryId,
        languageId,
      };
      try {
        const {data: info} = await categoryApi.getInfoById(params);

        dispatch(categoryActionCreators.setCategoryInfo(languageId, info));
      } catch (e) {
        console.log(e);
      }

      return 'CategoryPage';
    }

    return 'CategoriesPage';
  }

  return 'NotFoundPage';
}
