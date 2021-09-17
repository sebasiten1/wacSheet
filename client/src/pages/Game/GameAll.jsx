import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import GameList from './GameList/GameList';
import Button from '@material-ui/core/Button';

import { ApiContext } from '../../context/ApiContextProvider';

const useStyle = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(6),
    width: '100vw'
  }
}));

const GameAll = () => {
  const classes = useStyle();
  const { getAllGames } = useContext(ApiContext);

  const [gameList, setgameList] = useState([]);

  useEffect(() => {
    if (!gameList.length) {
      getAllGames() // remplacer par getCurrentPlayerGames -> non fonctionnelle
        .then((result) => {
          setgameList(result.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <Grid container justify="center" spacing={4}>
      <Paper className={classes.paper}>
        <Button>Nouvelle partie</Button>
        <h2>Mes parties en cours</h2>
        {gameList.map((game) => {
          return <GameList key={`${game.id}_game_list`} {...game} />;
        })}
      </Paper>
    </Grid>
  );
};

export default GameAll;
