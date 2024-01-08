export type ParseErrorMap = {
  default?: string;
  [key: number]: string;
};
export const parseHttpError = (error: any, map: ParseErrorMap) => {
  if (!!error) {
    const errorStatus = error.status;
    if (errorStatus && map[errorStatus]) {
      return map[errorStatus];
    }
    return map.default || 'Sorry, something went wrong';
  }
  return '';
};
