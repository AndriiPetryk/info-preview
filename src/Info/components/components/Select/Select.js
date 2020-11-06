// @flow
import * as React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

type Props = {
  selectedEntityId: number,
  onChange: Function,
  entityList: Array<{
    id: number,
    value: number,
    name: string,
    label: React.Node,
  }>,
  entityType: string,
};

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    width: '224px',
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      backgroundColor: theme.palette.background.paper,
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const SelectCommon = ({
  selectedEntityId,
  onChange,
  entityList,
  entityType,
}: Props): React.Node => {
  const classes = useStyles();

  const content =
    entityType === 'bucket'
      ? entityList.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))
      : entityList.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ));

  return (
    <FormControl className={classes.margin}>
      <Select
        labelId={`${entityType}-customized-select-label`}
        id={`${entityType}-customized-select`}
        value={selectedEntityId}
        onChange={({ target }) => onChange(target, entityType)}
        input={<BootstrapInput />}
      >
        {content}
      </Select>
    </FormControl>
  );
};

export default SelectCommon;
