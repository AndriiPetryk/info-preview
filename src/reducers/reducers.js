import { combineReducers } from 'redux';

import infoReducer from '../Info/redux/reducers/infoExperienceReducer';
import infoReducerDetails from '../Info/redux/reducers/infoExperienceDetailsReducer';
import bucketReducer from '../Info/redux/reducers/buckets';
import categoriesReducer from '../Info/redux/reducers/categories';
import locationsReducer from '../Info/redux/reducers/locations';
import programsReducer from '../Info/redux/reducers/programs';
import loadingReducer from '../Info/redux/reducers/loading';

export default combineReducers({
  bucketList: bucketReducer,
  locationsList: locationsReducer,
  infoCategoriesList: categoriesReducer,
  infoReducer,
  infoReducerDetails,
  loadingReducer,
  programList: programsReducer,
});
