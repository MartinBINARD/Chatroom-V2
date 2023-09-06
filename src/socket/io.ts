/*
  1. Initialisation
  je me connecte à mon serveur Websocket
*/
import { io } from 'socket.io-client';

// eslint-disable-next-line import/prefer-default-export
export const socket = io('http://localhost:3001');
