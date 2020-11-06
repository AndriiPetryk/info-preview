import { bucketList } from '../../enums/reduxStateKeys';

const initialState = {
  data: {},
  isFetching: false,
  dataReceived: false,
  hasError: false,
};

export default function (state = initialState, action) {
  if (action.type === bucketList) {
    return { ...state, ...action.payload };
  }
  return state;
}
