import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import env from '../env';

axios.defaults.baseURL = env.baseURL;

export const ApiContext = createContext();

export default function ApiContextProvider(props) {
  const [cookies] = useCookies('user');
  const headers = { 'x-access-token': cookies.user.accessToken };

  const apiRequests = {
    userSignin: (email, password) => {
      return axios.post('/auth/signin', { email: email, password: password });
    },

    userSignup: (email, emailCheck, username, password, passwordCheck) => {
      return axios.post('/auth/signup', {
        email: email,
        emailCheck: emailCheck,
        username: username,
        password: password,
        passwordCheck: passwordCheck
      });
    },

    forgotPassword: (email) => {
      return axios.post('/auth/forgot-password', { email: email });
    },

    resetPassword: (token) => {
      return axios.post('/auth/reset', { token: token });
    },

    getAllEquipment: () => {
      return axios.get('api/equipments/all', {
        headers: headers
      });
    },

    getEquipment: (equipmentId) => {
      return axios.get('/equipments', {
        headers: headers,
        params: { equipmentId: equipmentId }
      });
    },

    getEquipmentInGame: (gameId) => {
      return axios.get('/equipments/game', { headers: headers, params: { gameId: gameId } });
    },

    createEquipment: (name, stats, description, type, weight, slots) => {
      return axios.post(
        '/equipments/create',
        {
          name: name,
          stats: stats,
          description: description,
          type: type,
          weight: weight,
          slots: slots
        },
        { headers: headers }
      );
    },

    addPlayerEquipment: (gameId, userId, equipmentId) => {
      return axios.post(
        '/equipments/add',
        {
          gameId: gameId,
          userId: userId,
          equipmentId: equipmentId
        },
        { headers: headers }
      );
    },

    updateEquipment: (name, stats, description, type, weight, slots) => {
      return axios.put(
        '/equipments',
        {
          name: name,
          stats: stats,
          description: description,
          type: type,
          weight: weight,
          slots: slots
        },
        { headers: headers }
      );
    },

    deleteEquipment: (equipmentId) => {
      return axios.delete('/equipments', { equipmentId: equipmentId }, { headers: headers });
    },

    removePlayerEquipment: (equipmentId) => {
      return axios.delete('/equipments/delete', { equipmentId: equipmentId }, { headers: headers });
    },

    getAllGames: () => {
      return axios.get('/games/all', { headers: headers });
    },

    getCurrentPlayerGames: () => {
      return axios.get('/games/current', { headers: headers });
    },

    getGame: (gameId) => {
      return axios.get('/games', {
        headers: headers,
        params: { gameId: gameId }
      });
    },

    getAllPlayersInGame: (gameId) => {
      return axios.get('/games/players', {
        headers: headers,
        params: { gameId: gameId }
      });
    },

    getGameMaster: (gameId) => {
      return axios.get('/games/players/master', {
        headers: headers,
        params: { gameId: gameId }
      });
    },

    isPlayerInGame: (gameId) => {
      return axios.get('/games/players/exist', {
        headers: headers,
        params: { gameId: gameId }
      });
    },

    createGame: (name, password) => {
      return axios.post('/games/create', { name: name, password: password }, { headers: headers });
    },

    updateGame: (gameId, name, password) => {
      return axios.put(
        '/games',
        { gameId: gameId, name: name, password: password },
        { headers: headers }
      );
    },

    deleteGame: (gameId) => {
      return axios.delete('/games', { gameId: gameId }, { headers: headers });
    },

    addPlayerToGame: (gameId, userId) => {
      return axios.post(
        '/games/players/add',
        { gameId: gameId, userId: userId },
        { headers: headers }
      );
    },

    removePlayerFromGame: (gameId, userId) => {
      return axios.delete(
        '/games/players/remove',
        { gameId: gameId, userId: userId },
        { headers: headers }
      );
    },

    getAllUsers: () => {
      return axios.get('/users/all', { headers: headers });
    },

    getUser: (userId) => {
      return axios.get('/users', {
        headers: headers,
        params: { userId: userId }
      });
    },

    getCurrentUser: () => {
      return axios.get('/users/current', { headers: headers });
    },

    updateUser: (userId, name, password) => {
      return axios.put(
        '/users',
        { userId: userId, name: name, password: password },
        { headers: headers }
      );
    },

    deleteUser: (userId) => {
      return axios.delete('/users', { userId: userId }, { headers: headers });
    }
  };

  return <ApiContext.Provider value={apiRequests}>{props.children}</ApiContext.Provider>;
}

ApiContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};
