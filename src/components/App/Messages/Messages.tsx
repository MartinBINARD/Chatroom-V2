import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../../hooks/redux';

import MessagesItem from './MessagesItem';

import './Messages.scss';

function Messages() {
  const messages = useAppSelector((state) => state.chat.messages);

  const messagesRef = useRef<HTMLElement>(null);

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
