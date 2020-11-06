// import { API } from '../../enums/api';
import { bucketList } from '../../enums/reduxStateKeys';
import { hideLoader, showLoader } from './loading';
// import { fetchRequest } from '../../utils/axios';
import { fakeFetch } from '../../utils/axios';
import bucketsData from '../../mockData/buckets.json';

const fetchBucketList = (params) => async (dispatch) => {
  // const url = API.company.buckets(params);
  dispatch(showLoader());
  // const response = await fetchRequest('GET', url, params);
  const response = await fakeFetch(bucketsData);
  const {
    data: { program_buckets },
  } = response;
  dispatch({
    type: bucketList,
    payload: { data: program_buckets, dataReceived: true },
  });
  dispatch(hideLoader());
};

export default fetchBucketList;
