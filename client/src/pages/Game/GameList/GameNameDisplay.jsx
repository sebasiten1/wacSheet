import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => ({
  gameName: {
    display: 'inline-block',
    padding: '10px',
    minWidth: '100px'
  },
  a: {
    color: 'white',
    textDecoration: 'none'
  }
}));

const GameNameDisplay = (props) => {
  const classes = useStyle();

  return (
    <div className={classes.gameName}>
      <a className={classes.a} href={`./game/${props.id}`}>
        <p>{props.name}</p>
      </a>
    </div>
  );
};

GameNameDisplay.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string
};

export default GameNameDisplay;
