export function getFirstParamFromPathname(pathname) {
  pathname = pathname.split('/');
  pathname.shift();

  if ('ru' === pathname[0] || '' === pathname[0]) {
    pathname.shift();
  }

  pathname.shift();

  pathname[0] = pathname[0] ? parseInt(pathname[0]) : undefined;

  return pathname[0];
}
