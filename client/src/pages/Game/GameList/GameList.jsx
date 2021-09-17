import React from 'react';
import PropTypes from 'prop-types';

import GameNameDisplay from './GameNameDisplay';
import PlayersDisplay from './PlayersDisplay';

import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => ({
  gameContainer: {
    display: 'inline-none',
    columnGap: '30px',
    margin: '10px 0',
    border: '1px solid white'
  }
}));

const GameList = (props) => {
  const classes = useStyle();

  return (
    <div className={classes.gameContainer}>
      <GameNameDisplay {...props} />
      <PlayersDisplay id={props.id} />
    </div>
  );
};

GameList.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  ownerId: PropTypes.number
};

export default GameList;
