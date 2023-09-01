import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../../hooks/redux';

import MessagesItem from './MessagesItem';

import './Messages.scss';

/*
  Objectif:
  je veux scroller en bas de `.messages` à l'initialisation
  et à chaque nouveau message

  1. « à l'initialisation et à chaque nouveau message »
    → useEffect(effect, [messages])

  2. je veux cibler ma `section.messages`

  3. scroll → scrollTo(x, y)
*/

function Messages() {
  const messages = useAppSelector((state) => state.chat.messages);

  /*
    je mets en place une référence vers mon élément `.messages` du DOM RÉEL
    pour l'instant, il n'existe pas encore, j'initialise à `null`
  */
  const messagesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // je récupère la valeur enregistrée dans ma référence
    // avec la propriété `current`
    messagesRef.current?.scrollTo(0, messagesRef.current?.scrollHeight);
  }, [messages]);

  return (
    // Grâce à l'attribut JSX `ref`, je passe mon élément
    // à la ref `messagesRef` dès qu'il est créé dans le DOM réel
    <section className="messages" ref={messagesRef}>
      {messages.map((message) => (
        <MessagesItem
          key={message.id}
          // au lieu de :
          // id={message.id}
          // author={message.author}
          // content={message.content}
          // je peux déverser mon objet
          // → toutes les propriétés de `message` vont devenir des props
          {...message}
        />
      ))}
    </section>
  );
}

export default Messages;
