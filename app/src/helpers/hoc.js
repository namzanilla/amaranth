import * as categoryApi from 'api/category';
import * as categoryActionCreators from 'store/actions/category';
import {isEmpty} from './_Object';

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
    if (pathname[1] && /^\d+$/.test(pathname[1])) {
      return 'CategoryPage';
    }

    return 'CategoriesPage';
  } else if (/^p\d+$/.test(pathname[0])) {
    return 'ProductPage';
  }

  return 'NotFoundPage';
}
