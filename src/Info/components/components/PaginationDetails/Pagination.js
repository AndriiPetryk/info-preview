// @flow
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';

type Props = {
  location: {
    search: string,
    pathname: string,
  },
  history: {
    push: Function,
  },
  pageCount: number,
  urlParams: {
    page: string,
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const PaginationControlled = ({
  location,
  history,
  pageCount,
  urlParams,
}: Props) => {
  const { page: pageUrlParams } = urlParams;
  const classes = useStyles();

  const onPageChange = (event, value) => {
    const parsedSearch = qs.parse(location.search, { ignoreQueryPrefix: true });
    const newSearch = qs.stringify(
      { ...parsedSearch, page: value },
      { addQueryPrefix: true }
    );
    history.push(`${location.pathname}${newSearch}`);
  };

  return (
    <div className={classes.root}>
      <Pagination
        count={pageCount}
        page={+pageUrlParams}
        onChange={onPageChange}
      />
    </div>
  );
};

export default (withRouter(PaginationControlled): any);
