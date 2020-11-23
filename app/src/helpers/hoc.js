export function getHoc(pathname)  {
  pathname = pathname.split('/');
  pathname.shift();

  if ('ru' === pathname[0] || '' === pathname[0]) {
    pathname.shift();
  }

  if (!pathname.length) return 'HomePage';

  if ('cart' === pathname[0]) {
    return 'CartPage';
  } else if ('order' === pathname[0]) {
    return 'OrderPage';
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
