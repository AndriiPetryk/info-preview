// @flow
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import styles from './InfoDetailsCard.module.scss';
import WishlistIcon from '../WishlistIcon/WishlistIcon';

type Props = {
  imgSrc: string,
  infoName: string,
  isWishListed: boolean,
  onWishListIconClick: Function,
  hoverText: string,
};

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
}));

export default function InfoDetailsCard(rest: Props): React.Node {
  const classes = useStyles();

  const {
    imgSrc,
    infoName,
    isWishListed,
    onWishListIconClick,
    hoverText,
  } = rest;

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={imgSrc} title={infoName} />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={styles.infoDetailsText}
        >
          {hoverText}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={onWishListIconClick} aria-label="add to favorites">
          <WishlistIcon
            className={styles.wishlistIcon}
            onClick={onWishListIconClick}
            filled={isWishListed}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
}
