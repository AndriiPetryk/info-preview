// @flow
import * as React from 'react';
import Box from '@material-ui/core/Box';
import _isEqual from 'lodash/isEqual';
import _isArray from 'lodash/isArray';
import NoResults from './NoResults';
import HasError from './HasError';
import FilterBlock from '../Filters/FilterBlock/FilterBlockContainer';
import DetailsInfoModalContainer from '../DetailsInfoModal/DetailsInfoModalContainer';
import { OTHER_LOCATION } from '../../enums/locations';
import Loader from '../components/Loader/Loader';
import InfoDetailsCard from '../components/InfoDetailsCard/InfoDetailsCard';

import {
  INFO_CATEGORY_ID,
  INFO_LOCATION_ID,
  INFO_BUCKET_ID,
} from '../../constants';

import type {
  InfoContentProps as Props,
  InfoContentState as State,
} from '../../constants';

import { toggleInWishlist } from '../../utils';
import styles from './InfoContent.module.scss';
import Pagination from '../components/PaginationDetails/Pagination';

class InfoContent extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      isDetailsModalOpen: false,
      currentInfoId: null,
      wishlistTotalCount: null,
      wishListIds: [],
    };
  }

  componentDidMount() {
    const {
      fetchBucketList,
      fetchProgramList,
      fetchLocations,
      initialDataReceived,
    } = this.props;
    if (initialDataReceived) {
      this.fetchExperiencesWithDefaultFilters();
    } else {
      fetchBucketList();
      fetchProgramList();
      fetchLocations();
    }
  }

  componentDidUpdate(prevProps: Props) {
    const {
      urlParams,
      fetchInfo,
      wishlistedOfferingsIds,
      initialDataReceived,
    } = this.props;

    if (!prevProps.initialDataReceived && initialDataReceived) {
      this.fetchExperiencesWithDefaultFilters();
      return;
    }

    const didWihlistedOfferingsIdsChange = !_isEqual(
      prevProps.wishlistedOfferingsIds,
      wishlistedOfferingsIds
    );
    const didParamsChange = !_isEqual(prevProps.urlParams, urlParams);
    if (didParamsChange) {
      fetchInfo(urlParams);
    }
    if (didWihlistedOfferingsIdsChange) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        wishListIds: wishlistedOfferingsIds,
        wishlistTotalCount: wishlistedOfferingsIds.length,
      });
    }
  }

  fetchExperiencesWithDefaultFilters: Function = (): void => {
    const { urlParams, fetchInfo, defaultBucketId, locationId } = this.props;

    if (
      (defaultBucketId && !urlParams[INFO_BUCKET_ID]) ||
      (locationId && !urlParams[INFO_LOCATION_ID])
    ) {
      // no needed filters, applying defaults
      this.applyDefaultFilters();
    } else {
      fetchInfo(urlParams);
    }
  };

  onModalClose: Function = (): void => {
    this.setState({ isDetailsModalOpen: false, currentInfoId: null });
  };

  onFetchInfoDetails: Function = (
    offeringData: { id: number },
    offeringDataType: string
  ): void => {
    const { fetchinfoDetails } = this.props;
    const offeringId =
      offeringDataType === 'offeringId' ? offeringData : offeringData.id;
    this.setState({ isDetailsModalOpen: true, currentInfoId: offeringId }, () =>
      fetchinfoDetails(offeringId)
    );
  };

  onTotalCount: Function = (): void => {
    const { wishListIds } = this.state;
    const wishlistTotalCount =
      wishListIds.length === 0 ? null : wishListIds.length;
    this.setState({ wishlistTotalCount });
  };

  isWishlisted: Function = (id: number): boolean => {
    const { wishListIds }: State = this.state;
    return !!wishListIds.includes(id);
  };

  onWishlistUpdate: Function = async (event: any, id: number) => {
    event.stopPropagation();
    const { locationId } = this.props;
    const { wishListIds } = this.state;
    try {
      await toggleInWishlist(id, locationId);
      const isExperienceIncluded = wishListIds.includes(id);
      if (!isExperienceIncluded) {
        this.setState(
          {
            wishListIds: [...wishListIds, id],
          },
          () => this.onTotalCount()
        );
      }
      if (isExperienceIncluded) {
        const index = wishListIds.indexOf(id);
        wishListIds.splice(index, 1);
        this.setState({ wishListIds }, () => this.onTotalCount());
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  applyDefaultFilters: Function = (): void => {
    const {
      locationId,
      defaultBucketId,
      userLocationIsFilterable,
      onParamsChange,
    } = this.props;
    // redirecting with default location and bucket selected
    const defaultLocationId = userLocationIsFilterable
      ? locationId
      : OTHER_LOCATION; // user location or Other
    onParamsChange({
      [INFO_BUCKET_ID]: defaultBucketId,
      [INFO_LOCATION_ID]: defaultLocationId,
    });
  };

  render(): React.Node {
    const {
      dataReceived,
      hasError,
      isFetching,
      onParamsChange,
      Info,
      infosIds,
      InfoPageCount,
      urlParams,
      areFiltersApplied,
      isOnlyActivated,
    } = this.props;

    const { [INFO_CATEGORY_ID]: categoryIds } = urlParams;
    const showCategory = !!categoryIds;

    const {
      isDetailsModalOpen,
      currentInfoId,
      wishlistTotalCount,
    } = this.state;

    const isLoading = isFetching || !dataReceived;
    const noResults =
      dataReceived && infosIds.length === 0 && areFiltersApplied;

    let content;
    if (!_isArray(Info)) {
      content = <Loader />;
    } else if (hasError) {
      content = <HasError onParamsChange={onParamsChange} />;
    } else if (noResults) {
      content = <NoResults onParamsChange={onParamsChange} />;
    } else {
      content = (
        <div className={styles.InfoWrap}>
          {currentInfoId && (
            <DetailsInfoModalContainer
              showCategory={showCategory}
              isDetailsModalOpen={isDetailsModalOpen}
              isWishlisted={this.isWishlisted}
              onWishlistIconClick={this.onWishlistUpdate}
              onModalClose={this.onModalClose}
              currentInfoId={currentInfoId}
              wishlistTotalCount={wishlistTotalCount}
              onFetchInfoDetails={this.onFetchInfoDetails}
            />
          )}
          {Info.map((data) => {
            const {
              id,
              name: infoName,
              catalog_cover_image_url: imgSrc,
              primary_experience_category,
              tagline: hoverText,
            } = data;
            const infoCategory =
              primary_experience_category !== null
                ? primary_experience_category.name
                : '';
            return (
              <div
                key={id}
                onClick={() => this.onFetchInfoDetails(data, 'offeringData')}
                className={styles.column}
              >
                <InfoDetailsCard
                  imgSrc={imgSrc}
                  infoName={infoName}
                  infoCategory={infoCategory}
                  isWishListed={this.isWishlisted(id)}
                  onWishListIconClick={(event) =>
                    this.onWishlistUpdate(event, id)
                  }
                  hoverText={hoverText}
                />
              </div>
            );
          })}
        </div>
      );
    }
    return (
      <>
        <FilterBlock
          isOnlyActivated={isOnlyActivated}
          wishlistTotalCount={wishlistTotalCount}
        />
        <Box
          component="div"
          display="flex"
          justifyContent="flex-end"
          p={1}
          m={1}
          bgcolor="background.paper"
        >
          <Pagination urlParams={urlParams} pageCount={InfoPageCount} />
        </Box>
        {isLoading ? <Loader /> : content}
      </>
    );
  }
}

export default InfoContent;
