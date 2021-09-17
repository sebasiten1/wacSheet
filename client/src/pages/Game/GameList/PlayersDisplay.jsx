import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ApiContext } from '../../../context/ApiContextProvider';

import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => ({
  playersContainer: {
    display: 'inline-block'
  },
  player: {
    display: 'inline-block',
    width: '100px',
    padding: '10px'
  }
}));

const PlayersDisplay = (props) => {
  const classes = useStyle();
  const { getAllPlayersInGame } = useContext(ApiContext);

  const [PlayersList, setPlayersList] = useState([]);

  useEffect(() => {
    if (!PlayersList.length) {
      getAllPlayersInGame(props.id)
        .then((playersList) => {
          setPlayersList(playersList.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className={classes.playersContainer}>
      {PlayersList.map((player) => {
        return (
          <div className={classes.player} key={player.id}>
            <p>{player.username}</p>
          </div>
        );
      })}
    </div>
  );
};

PlayersDisplay.propTypes = {
  id: PropTypes.number
};

export default PlayersDisplay;
