/* eslint-disable import/prefer-default-export */
import { socket } from './io';

import store from '../store';

import { Message } from '../@types';
import { addMessage } from '../store/reducers/chat';

export const sendMessage = (message: Message) => {
  // j'envoie un évènement à mon serveur
  // pour prévenir que j'ai un nouveau message
  socket.emit('client_send_message', message);
};

export const subscribeToNewMessage = () => {
  // j'écoute l'évènement émis par mon serveur
  // à chaque fois qu'un message est envoyé.
  // Je pourrai enregistrer ce message dans le state
  // et mettre à jour la liste des messages
  // → dispatch()
  socket.on('server_send_message', (message: Message) => {
    store.dispatch(addMessage(message));
  });
};

export const unsubscribeToNewMessage = () => {
  // j'arrête d'écouter l'évènement 'server_send_message'
  socket.off('server_send_message');
};
