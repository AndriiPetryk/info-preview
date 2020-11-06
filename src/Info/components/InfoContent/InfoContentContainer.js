import { compose } from 'redux';
import { connect } from 'react-redux';
import withUrlParamsChange from '../../HOC/withUrlParamsChange';
import {
  getAvailableBucketsIdsInAllPrograms,
  getAvailableBucketIdByPricePriority,
} from '../../redux/reducers/selectors/bucketList';
import {
  bucketList as bucketListStateKey,
  programList as programListStateKey,
  locationsList as locationsListStateKey,
} from '../../enums/reduxStateKeys';

import { fetchInfo, fetchinfoDetails } from '../../redux/actions/fetchInfo';
import fetchBucketList from '../../redux/actions/fetchBucketList';
import fetchLocations from '../../redux/actions/fetchLocations';
import { fetchProgramList } from '../../redux/actions/programs';
import { checkIfFiltersApplied, getArrayOfLocationsIds } from '../../utils';
import {
  PER_PAGE,
  DEFAULT_SELECTED_BUCKET_BY_PRICE_PRIORITY,
} from '../../constants';
import InfoContent from './InfoContent';

const mapStateToProps = (state, { urlParams }) => {
  const {
    [bucketListStateKey]: bucketListState,
    [programListStateKey]: programListState,
    [locationsListStateKey]: locationsListState,
    infoReducer,
  } = state;

  const {
    ids: infosIds,
    byId: Info,
    meta: infoReducerMeta,
    isFetching: isInfoDataFetching,
    dataReceived: isInfoDataReceived,
    hasError: isInfoDataHasError,
  } = infoReducer;

  const locationsData = locationsListState.data;
  const locationsDataReceived = locationsListState.dataReceived;
  const filterableLocationIds = getArrayOfLocationsIds(locationsData);

  const bucketList = bucketListState.data;
  const bucketListReceived = bucketListState.dataReceived;

  const programList = programListState.data;
  const programListReceived = programListState.dataReceived;

  const availableBucketsIds = getAvailableBucketsIdsInAllPrograms(
    bucketList,
    programList
  );

  const defaultBucketId = getAvailableBucketIdByPricePriority(
    availableBucketsIds,
    DEFAULT_SELECTED_BUCKET_BY_PRICE_PRIORITY
  );

  const locationId = 1;
  const userLocationIsFilterable = filterableLocationIds.includes(locationId);

  const {
    total_entries: InfoTotalCount,
    wishlisted_offerings_ids: wishlistedOfferingsIds,
    experience_categories: infoCategoriesList,
  } = infoReducerMeta || {};

  const InfoPageCount = Math.ceil(InfoTotalCount / PER_PAGE) || 0;

  const initialDataReceived =
    bucketListReceived && programListReceived && locationsDataReceived;

  return {
    Info,
    locationId,
    infosIds: infosIds || [],
    isInfoDataReceived,
    infoReducer,
    InfoTotalCount: InfoTotalCount || 0,
    InfoPageCount,
    wishlistedOfferingsIds: wishlistedOfferingsIds || [],
    infoCategoriesList: infoCategoriesList || [],
    areFiltersApplied: checkIfFiltersApplied(urlParams),
    hasError: isInfoDataHasError,
    isFetching: isInfoDataFetching,
    dataReceived: isInfoDataReceived,
    defaultBucketId,
    userLocationIsFilterable,
    initialDataReceived,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchLocations: () => dispatch(fetchLocations()),
  fetchBucketList: () => dispatch(fetchBucketList()),
  fetchProgramList: () => dispatch(fetchProgramList()),
  fetchInfo: (params) => dispatch(fetchInfo(params)),
  dispatch,
});

const mergeProps = (stateToProps, dispatchStateToProps, ownProps) => {
  const { infoReducer, ...restStateToProps } = stateToProps;
  const { dispatch, ...restDispatchStateToProps } = dispatchStateToProps;
  return {
    ...restStateToProps,
    ...restDispatchStateToProps,
    ...ownProps,
    fetchinfoDetails: (offeringId) => {
      const offering = infoReducer.byId.find(({ id }) => id === offeringId);
      return dispatch(fetchinfoDetails(offering));
    },
  };
};

export default compose(
  withUrlParamsChange,
  connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(InfoContent);
