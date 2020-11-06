import qs from 'qs';

export const queryStringify = (params) =>
  qs.stringify(params, { addQueryPrefix: true, arrayFormat: 'brackets' });
