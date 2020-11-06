// @flow
import * as React from 'react';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import styles from './PrevNextButtons.module.scss';

type ArrowProps = {
  onClick: Function,
};

type ButtonsProps = {
  onPrevClick: Function,
  onNextClick: Function,
  classNamePrev: string,
  classNameNext: string,
};

const NextArrow = ({ onClick }: ArrowProps): React.Node => (
  <Button
    className={styles.nextArrow}
    variant="contained"
    size="medium"
    color="primary"
    onClick={onClick}
  >
    Next
    <ArrowForwardIosIcon />
  </Button>
);

const PrevArrow = ({ onClick }: ArrowProps): React.Node => (
  <Button
    className={styles.prevArrow}
    variant="contained"
    size="medium"
    color="primary"
    onClick={onClick}
  >
    <ArrowBackIosIcon />
    Prev
  </Button>
);

const PrevNextButtons = ({
  onPrevClick,
  onNextClick,
  classNamePrev,
  classNameNext,
}: ButtonsProps): React.Node => (
  <>
    <PrevArrow onClick={onPrevClick} className={classNamePrev} />
    <NextArrow onClick={onNextClick} className={classNameNext} />
  </>
);

export default PrevNextButtons;
