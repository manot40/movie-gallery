export function qsFormat(query: Record<string, any>): string {
  return Object.keys(query)
    .map((key) => `${key}=${query[key] || ''}`)
    .join('&');
}

export function qsParse(query: string): Record<string, string> {
  return query
    .split('&')
    .map((pair) => pair.split('='))
    .reduce((acc, [key, value]) => {
      // @ts-ignore
      acc[key] = value;
      return acc;
    }, {});
}
