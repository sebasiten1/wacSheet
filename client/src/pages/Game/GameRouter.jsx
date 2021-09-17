import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { ApiContext } from '../../context/ApiContextProvider';
import Loading from '../../components/Loading/Loading';
import ErrorPage from './ErrorPage';
import CharacterSheet from '../CharacterSheet/CharacterSheet';
import GameMasterInterface from '../GameMasterInterface/GameMasterInterface';

const GameRouter = () => {
  const { getGame, isPlayerInGame } = useContext(ApiContext);
  const [loading, setLoading] = useState(true);
  const [renderIndex, setRenderIndex] = useState(0);
  const [game, setGame] = useState(null);
  const { gameId } = useParams();
  const [cookies] = useCookies('user');
  const userId = cookies.user.userId;

  const catchHandler = (error) => {
    setRenderIndex(0);
    setLoading(false);
    console.error('error: ', error);
  };

  const renderSelector = (index) => {
    const toRender = [
      <ErrorPage key={'error'} />,
      <CharacterSheet key={'player'} game={game} />,
      <GameMasterInterface key={'gm'} game={game} />
    ];

    return toRender[index];
  };

  useEffect(() => {
    if (!game) {
      getGame(gameId)
        .then((result) => {
          setGame(result.data);
        })
        .catch(catchHandler);
    }
  }, []);

  useEffect(() => {
    if (game) {
      isPlayerInGame(gameId)
        .then((result) => {
          if (result.data.playerExist) {
            if (game.ownerId === userId) {
              setRenderIndex(2);
            } else {
              setRenderIndex(1);
            }
            setLoading(false);
          } else {
            throw 'User is not part of this game.';
          }
        })
        .catch(catchHandler);
    }
  }, [game]);

  if (loading) {
    return <Loading size={80} />;
  } else {
    return renderSelector(renderIndex);
  }
};

export default GameRouter;
