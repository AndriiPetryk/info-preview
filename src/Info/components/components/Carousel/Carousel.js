// @flow
import * as React from 'react';
import Carousel from 'react-material-ui-carousel';
import classNames from 'classnames';
import styles from '../ExperienceDetailsInfo/ExperienceDetailsInfo.module.scss';

type Props = {
  images: [],
  customInfoPictureClassName: string,
};

const ImageCarousel = ({
  images,
  customInfoPictureClassName,
}: Props): React.Node => {
  return (
    <Carousel indicators={false}>
      {images.map((image) => (
        <img
          src={image}
          key={image}
          alt="experience"
          className={classNames(styles.infoPicture, {
            [customInfoPictureClassName]: !!customInfoPictureClassName,
          })}
        />
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
