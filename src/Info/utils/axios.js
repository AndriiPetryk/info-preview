import qs from 'qs';
import axios from 'axios';

const CORS = {
  withCredentials: true,
  crossDomain: true,
  mode: 'cors',
  credentials: 'include',
};

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const fetchConfig = {
  ...CORS,
  headers: HEADERS,
};

export const fetchRequest = (method, url, queryParams) => {
  const urlRequest =
    method === 'GET' && queryParams
      ? url + qs.stringify(queryParams, { addQueryPrefix: true })
      : url;

  const requestObject = {
    ...fetchConfig,
    method,
    url: urlRequest,
  };

  return axios.request({ ...requestObject });
};

export const fakeFetch = (value) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: value }), 1000)
  );
};
