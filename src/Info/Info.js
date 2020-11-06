import React from 'react';
import { Typography } from '@material-ui/core';
import InfoContent from './components/InfoContent/InfoContentContainer';
import styles from './infoStyle.scss';

const Info = () => (
  <div className={styles.infoContainer}>
    <Typography align="left" color="initial" display="block" vvariant="h1">
      Info
    </Typography>
    <InfoContent />
  </div>
);

export default Info;
