// import { API } from '../../enums/api';
import {
  infoReducerDetails as infoReducerDetailsStateKey,
  infoReducer as infoReducerStateKey,
} from '../../enums/reduxStateKeys';

import { fetchRequest, fakeFetch } from '../../utils/axios';

import { hideLoader, showLoader } from './loading';
import infoData from '../../mockData/offerings.json';
import infoDetailsData from '../../mockData/infoDetail.json';

export const fetchinfoDetails = (offering) => async (dispatch) => {
  // const url = API.company.manager.offerings.details(offering.id);
  dispatch(showLoader());
  // const response = await fetchRequest('GET', url);
  const response = await fakeFetch(infoDetailsData);
  const {
    data: { offering: responseOffering },
  } = response;
  const responseData = {
    collectionDetails: [{ ...offering, ...responseOffering }],
    // meta: data.meta,
    dataReceived: true,
  };
  dispatch({ type: infoReducerDetailsStateKey, payload: responseData });
};

export const fetchInfo = (queryParams) => async (dispatch) => {
  // const url = API.company.manager.offerings.all(queryParams);
  dispatch(showLoader());
  // const response = await fetchRequest('GET', url, queryParams);
  const response = await fakeFetch(infoData);
  console.log('response', response);
  const { data } = response;
  const ids = data.offerings.map((offeringData) => offeringData.id);
  const responseData = {
    byId: [...data.offerings],
    ids,
    meta: data.meta,
    dataReceived: true,
  };
  dispatch({ type: infoReducerStateKey, payload: responseData });
  dispatch(hideLoader());
};
