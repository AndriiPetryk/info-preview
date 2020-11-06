// import { API } from '../../enums/api';
import { programList } from '../../enums/reduxStateKeys';
import { hideLoader, showLoader } from './loading';
// import { fetchRequest } from '../../utils/axios';
import { fakeFetch } from '../../utils/axios';
import programData from '../../mockData/propgrams.json';

export const fetchProgramList = () => async (dispatch) => {
  // const url = API.company.manager.programs;
  dispatch(showLoader());
  // const response = await fetchRequest('GET', url);
  const response = await fakeFetch(programData);
  const {
    data: { programs },
  } = response;

  dispatch({
    type: programList,
    payload: {
      data: programs,
      dataReceived: true,
    },
  });
  dispatch(hideLoader());
};
