import { infoCategoriesList } from '../../enums/reduxStateKeys';

const initialState = {
  data: {},
  isFetching: false,
  dataReceived: false,
  hasError: false,
};

export default function (state = initialState, action) {
  if (action.type === infoCategoriesList) {
    return { ...state, ...action.payload };
  }
  return state;
}
