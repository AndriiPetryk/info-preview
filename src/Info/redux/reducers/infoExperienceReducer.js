import { infoReducer } from '../../enums/reduxStateKeys';

const initialState = {
  byId: [],
  ids: [],
  meta: null,
  isFetching: false,
  dataReceived: false,
  hasError: false,
};

export default function (state = initialState, action) {
  if (action.type === infoReducer) {
    return { ...state, ...action.payload };
  }
  return state;
}
