import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  centered: {
    height: '100vh' /* Magic here */,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    height: (props) => props.size * 1.5,
    width: (props) => props.size * 1.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const Loading = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.centered}>
      <Paper className={classes.paper}>
        <CircularProgress color="secondary" {...props} />
      </Paper>
    </div>
  );
};

Loading.propTypes = {
  size: PropTypes.number
};

Loading.defaultProps = {
  size: 40
};

export default Loading;
