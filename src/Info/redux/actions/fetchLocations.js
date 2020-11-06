// import { API } from '../../enums/api';
import { locationsList } from '../../enums/reduxStateKeys';
import { hideLoader, showLoader } from './loading';
// import { fetchRequest } from '../../utils/axios';
import { fakeFetch } from '../../utils/axios';
import locations from '../../mockData/locations.json';

const fetchLocations = (params) => async (dispatch) => {
  // const url = API.locations(params);
  dispatch(showLoader());
  // const response = await fetchRequest('GET', url, params);
  const response = await fakeFetch(locations);
  const {
    data: { specified_locations, supported_locations },
  } = response;
  dispatch({
    type: locationsList,
    payload: {
      data: { specified_locations, supported_locations },
      dataReceived: true,
    },
  });
  dispatch(hideLoader());
};

export default fetchLocations;
