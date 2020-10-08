export function getHtmlLangAttribute(languageId) {
  return 1 === languageId ? 'uk' : 'ru-UA';
}

export function getLangIdByUrlPath(pathname) {
  if ('/ru' !== pathname.substring(0, 3)) {
    return 1;
  }

  if (3 === pathname.length || '/' === pathname[3]) {
    return 2;
  }

  return 1;
}

export function getAlternate(pathname, querystring = '') {
  if (querystring && querystring.charAt(0) === '?') {
    querystring = querystring.substr(1);
  }

  let url = pathname;

  if (querystring) {
    url += '?'+querystring;
  }

  const langId = getLangIdByUrlPath(pathname);
  const alternate = {};

  if (1 === langId) {
    alternate.ru = '/ru';
    if (pathname !== '/') {
      alternate.ru += pathname;
    }
    if (querystring) {
      alternate.ru += '?'+querystring;
    }

    alternate.uk = url;
  } else {
    alternate.ru = url;
    alternate.uk = url.slice(3, url.length);

    if ('/' !== alternate.uk[0]) {
      alternate.uk = '/'+alternate.uk;
    }
  }

  return alternate;
}
