// @flow
import * as React from 'react';
import classNames from 'classnames';
import ImageCarousel from '../Carousel/Carousel';
import ShortDetails from './ShortDetails/ShortDetails';
import Details from './Details/Details';
import Loader from '../Loader/Loader';
import WishlistIcon from '../WishlistIcon/WishlistIcon';
import InfoLabel from '../infoLabel/InfoLabel';

import styles from './ExperienceDetailsInfo.module.scss';

type Props = {
  dataReceived: boolean,
  doNotShowCategory: boolean,
  onWishlistIconClick: Function,
  catalogImages: [],
  infoCategory: string,
  customInfoPictureClassName: string,
  customDetailsHolderClassName: string,
  customHolderClassName: string,
  customCarouselHolderClassName: string,
  infoTitle: string,
  isWishlisted: boolean,
  duration: string,
  location: string,
  groupSize: number,
  subDescription: React.Node,
};

const ExperienceDetailsInfo = ({
  dataReceived,
  catalogImages,
  infoCategory,
  doNotShowCategory,
  customInfoPictureClassName,
  customHolderClassName,
  customDetailsHolderClassName,
  customCarouselHolderClassName,
  infoTitle,
  onWishlistIconClick,
  isWishlisted,
  duration,
  location,
  groupSize,
  subDescription,
}: Props): React.Node => {
  if (!dataReceived) return <Loader />;

  const showCategory = infoCategory && !doNotShowCategory;

  return (
    <div
      className={classNames(styles.holder, {
        [customHolderClassName]: !!customHolderClassName,
      })}
      data-test-id="experience-details-info"
    >
      <div
        className={classNames(styles.carouselHolder, {
          [customCarouselHolderClassName]: !!customCarouselHolderClassName,
        })}
      >
        <ImageCarousel
          images={catalogImages}
          customInfoPictureClassName={customInfoPictureClassName}
        />
        <div className={styles.carouselInfo}>
          {showCategory && (
            <InfoLabel
              category={infoCategory}
              className={styles.infoCategory}
            />
          )}
          <div className={styles.infoTitle}>{infoTitle}</div>
        </div>
        <WishlistIcon
          filled={isWishlisted}
          className={styles.wishlist}
          onClick={onWishlistIconClick}
        />
      </div>
      <div className={styles.experienceDetailsHolder}>
        <ShortDetails
          duration={duration}
          location={location}
          groupSize={groupSize}
        />
        <Details
          className={customDetailsHolderClassName}
          subDescription={subDescription}
        />
      </div>
    </div>
  );
};

export default ExperienceDetailsInfo;
