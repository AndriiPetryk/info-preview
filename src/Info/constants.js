// @flow

export const sentRewardsPageQuery = 'page';
export const sentRewardsPerPageQuery = 'per_page';
export const sentRewardsSearchQuery = 'participant_name';
export const sentRewardsFromDate = 'sent_at_from';
export const sentRewardsToDate = 'sent_at_till';
export const programId = 'program_id';
export const orderingField = 'ordering_field';
export const orderingDirection = 'ordering_direction';
export const tabQuery = 'scope';
export const stateQuery = 'state';
export const statusQuery = 'status';
export const bucketIdQuery = 'bucket_id';

export const INFO_PAGE_QUERY: string = 'page';
// export const sentRewardsPageQuery = 'page';
export const INFO_PER_PAGE_QUERY: string = 'per_page';
export const INFO_BUCKET_ID: string = 'bucket_id';
export const INFO_LOCATION_ID: string = 'location_with_parents';
export const INFO_CATEGORY_ID: string = 'category_id';
export const INFO_LOCATION_TEXT: string = 'location_text';

export const FILTERS = {
  page: 'page',
  perPage: 'per_page'
};

export const DEFAULT_PAGE = '1';
export const PER_PAGE = '50';
export const DEFAULT_SELECTED_BUCKET_BY_PRICE_PRIORITY = [500, 250, 1000, 150];

export const INFO_DEFAULT_PARAMS = {
  page: DEFAULT_PAGE,
  per_page: PER_PAGE
};

export type urlParamsPropTypes = {
  page: string,
  per_page: string,
  bucket_id: string,
  location_with_parents: string,
  location_text: string
};

export type PREVIEW_INFO_SHAPE = {
  id: number,
  name: string,
  catalog_cover_image_url: string,
  tagline: string,
  is_wishlisted: boolean
};

export type BUCKETS_LIST_SHAPE = {
  bucket_id: number,
  custom_bucket_id: number,
  name: string,
  reward_type: string,
  standard: boolean,
  is_disabled: boolean,
  guideline: string,
  price: string
};

export type InfoContentProps = {
  fetchInfo: Function,
  fetchinfoDetails: Function,
  fetchBucketList: Function,
  fetchProgramList: Function,
  fetchLocations: Function,
  isFetching: boolean,
  userLocationIsFilterable: boolean,
  locationId: number,
  defaultBucketId: number,
  areFiltersApplied: boolean,
  isOnlyActivated: boolean,
  hasError: boolean,
  dataReceived: boolean,
  initialDataReceived: boolean,
  onParamsChange: Function,
  Info: Array<{
    id: number,
    name: string,
    catalog_cover_image_url: string,
    tagline: string,
    is_wishlisted: boolean,
    primary_experience_category: any
  }>,
  wishlistedOfferingsIds: Array<mixed>,
  infosIds: Array<number>,
  InfoTotalCount: number,
  InfoPageCount: number,
  urlParams: {
    category_id: string
  },
  isWishlisted: Function
};

export type InfoContentState = {
  isDetailsModalOpen: boolean,
  currentInfoId: any,
  wishlistTotalCount: any,
  wishListIds: Array<mixed>
};

export type INFO_CATEGORIES_LIST_SHAPE = {
  id: number,
  name: string
};

export type FilterProps = {
  wishlistTotalCount?: number,
  onParamsChange: Function,
  locationsData: {},
  infoCategoriesList: Array<mixed>,
  bucketsList: Array<mixed>,
  programList: Array<mixed>,
  urlParams: {
    bucket_id: string,
    location_with_parents: string,
    page: string,
    per_page: string
  },
  fetchInfoCategories: Function
};
