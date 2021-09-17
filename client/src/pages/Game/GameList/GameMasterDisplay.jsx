import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => ({
  gameContainer: {
    display: 'none',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid white'
  }
}));

const PlayerDisplay = (props) => {
  const classes = useStyle();

  return (
    <div className={classes.gameContainer}>
      <p>GM</p>
      <p>{props.name}</p>
    </div>
  );
};

PlayerDisplay.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  ownerId: PropTypes.number
};

export default PlayerDisplay;
