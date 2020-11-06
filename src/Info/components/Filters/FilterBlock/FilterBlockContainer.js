import { compose } from 'redux';
import { connect } from 'react-redux';
import withUrlParamsChange from '../../../HOC/withUrlParamsChange';
import {
  bucketList as bucketListStateKey,
  locationsList as locationsListStateKey,
  infoCategoriesList as infoCategoriesListStateKey,
  programList as programListStateKey,
} from '../../../enums/reduxStateKeys';
import fetchInfoCategories from '../../../redux/actions/fetchInfoCategories';

import FilterBlock from './FilterBlock';

const mapStateToProps = (state, { urlParams }) => {
  const {
    [bucketListStateKey]: bucketListState,
    [locationsListStateKey]: locationsListState,
    [infoCategoriesListStateKey]: infoCategoriesListState,
    [programListStateKey]: programListState,
  } = state;

  const locationId = 1;
  const companyId = 18;

  const bucketsList = bucketListState.data;

  const programList = programListState.data;

  const locationsData = locationsListState.data;

  const InfoCategoriesData = infoCategoriesListState.data;

  const { experience_categories: infoCategoriesList } = InfoCategoriesData;

  return {
    infoCategoriesList: infoCategoriesList || [],
    programList,
    bucketsList,
    companyId,
    urlParams,
    locationsData,
    locationId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchInfoCategories: (params) => dispatch(fetchInfoCategories(params)),
});

export default compose(
  withUrlParamsChange,
  connect(mapStateToProps, mapDispatchToProps)
)(FilterBlock);
