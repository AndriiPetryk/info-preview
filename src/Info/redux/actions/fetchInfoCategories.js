// import { API } from '../../enums/api';
import { infoCategoriesList } from '../../enums/reduxStateKeys';
import { hideLoader, showLoader } from './loading';
// import { fetchRequest } from '../../utils/axios';
import { fakeFetch } from '../../utils/axios';
import experienceData from '../../mockData/experience_categories.json';

const fetchInfoCategories = (params) => async (dispatch) => {
  // const url = API.company.InfoCategories(params);
  dispatch(showLoader());
  // const response = await fetchRequest('GET', url, params);
  const response = await fakeFetch(experienceData);
  const {
    data: { experience_categories, meta },
  } = response;
  dispatch({
    type: infoCategoriesList,
    payload: { data: { experience_categories }, meta, dataReceived: true },
  });
  dispatch(hideLoader());
};

export default fetchInfoCategories;
