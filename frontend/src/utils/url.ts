export function encodeUri(params: { [key: string]: string | number }): string {
  const keys = Object.keys(params);

  const searchParams = keys
    .map((key) => {
      const param = params[key];
      if (!param) return '';
      return `${encodeURIComponent(key)}=${encodeURIComponent(param)}`;
    })
    .filter(Boolean)
    .join('&');
  return `?${searchParams}`;
}

export function decodeUri(uri: string) {
  const urlSearch = new URLSearchParams(uri);
  const urlSearchParams: { [key: string]: string } = {};
  // eslint-disable-next-line
  for (const param of urlSearch.entries()) {
    const [key, value] = param;
    urlSearchParams[key] = value;
  }
  return urlSearchParams;
}
