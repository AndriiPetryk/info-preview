// @flow
import * as React from 'react';
import classNames from 'classnames';
import PersonIcon from '@material-ui/icons/Person';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import PlaceIcon from '@material-ui/icons/Place';
import styles from './ShortDetails.module.scss';

type Props = {
  duration: string,
  groupSize: number,
  location: string,
};

const ShortDetails = ({ duration, groupSize, location }: Props): React.Node => {
  return (
    <div className={styles.holder}>
      <span className={classNames([styles.item, styles.groupsize])}>
        <PersonIcon />
        {groupSize}
      </span>
      <span className={classNames([styles.item, styles.duration])}>
        <TimelapseIcon />
        {duration}
      </span>
      <span className={classNames([styles.item, styles.location])}>
        <PlaceIcon />
        {location}
      </span>
    </div>
  );
};

export default ShortDetails;
