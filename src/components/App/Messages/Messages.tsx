import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../../hooks/redux';

import useUpdateEffect from '../../../hooks/useUpdateEffect';
import useSound from '../../../hooks/useSound';

import {
  subscribeToNewMessage,
  unsubscribeToNewMessage,
} from '../../../socket/chat';

import MessagesItem from './MessagesItem';

import notificationSound from '../../../assets/sounds/notification.mp3';

import './Messages.scss';

function Messages() {
  const messages = useAppSelector((state) => state.chat.messages);

  const messagesRef = useRef<HTMLElement>(null);

  // ajout d'une référence pour gérer un élément audio
  // const audioElement = useRef<HTMLAudioElement | null>(null);

  // je fais appel à mon hook pour jouer un son
  const playSound = useSound(notificationSound);

  useEffect(() => {
    // j'attache mon élément audio
    // audioElement.current = new Audio(notificationSound);

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

    // lire le son à chaque fois que `messages` est modifié
    // if (audioElement.current) {
    //   //   je remets le son à 0 s
    //   audioElement.current.currentTime = 0;
    //   //   je lance le son
    //   audioElement.current.play();
    // }
  }, [messages]);

  useUpdateEffect(() => {
    // lire le son à chaque fois que `messages` est modifié
    // if (audioElement.current) {
    //   //   je remets le son à 0 s
    //   audioElement.current.currentTime = 0;
    //   //   je lance le son
    //   audioElement.current.play();
    // }
    playSound();
  }, [messages, playSound]);

  return (
    <section className="messages" ref={messagesRef}>
      {messages.map((message) => (
        <MessagesItem key={message.id} {...message} />
      ))}
    </section>
  );
}

export default Messages;
