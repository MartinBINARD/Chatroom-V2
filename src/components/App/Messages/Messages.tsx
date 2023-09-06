import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../../hooks/redux';

import {
  subscribeToNewMessage,
  unsubscribeToNewMessage,
} from '../../../socket/chat';

import MessagesItem from './MessagesItem';

import './Messages.scss';

function Messages() {
  const messages = useAppSelector((state) => state.chat.messages);

  const messagesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // je veux écouter l'évènement `server_send_message`
    // au montage de mon composant
    subscribeToNewMessage();

    // je n'oublie pas de nettoyer mon effet au démontage du composant
    // au risque de m'abonner À CHAQUE FOIS que <Messages /> est monté
    //   - au 1er affichage par React.StrictMode
    //   - à chaque fois qu'on sauvegarde le fichier (Vite)
    return () => {
      // au démontage : je me désabonne du Websocket
      unsubscribeToNewMessage();
    };
  }, []); // on ne s'abonne qu'au montage du composant

  useEffect(() => {
    messagesRef.current?.scrollTo(0, messagesRef.current?.scrollHeight);
  }, [messages]);

  return (
    <section className="messages" ref={messagesRef}>
      {messages.map((message) => (
        <MessagesItem key={message.id} {...message} />
      ))}
    </section>
  );
}

export default Messages;
