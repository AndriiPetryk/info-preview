import { infoReducerDetails } from '../../enums/reduxStateKeys';

const initialState = {
  collectionDetails: [],
  meta: null,
  isFetching: false,
  dataReceived: false,
  hasError: false,
};

export default function (state = initialState, action) {
  if (action.type === infoReducerDetails) {
    return { ...state, ...action.payload };
  }
  return state;
}
