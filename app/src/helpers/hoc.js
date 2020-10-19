export async function getHoc(pathname)  {
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
      return 'CategoryPage';
    }

    return 'CategoriesPage';
  }

  return 'NotFoundPage';
}
