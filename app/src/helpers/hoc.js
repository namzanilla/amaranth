export async function getHoc(pathname)  {
  if (pathname === '/' || pathname === '/ru') {
    return 'HomePage';
  }

  pathname = pathname.split('/');

  let segment;

  if (pathname[1] === 'ru') {
    segment = pathname[2];
  } else {
    segment = pathname[1];
  }

  if (/^c[0-9]+$/.test(segment)) {
    return 'CategoryPage';
  }

  return 'NotFoundPage';
}
