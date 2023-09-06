import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';

import { sendMessage } from '../../../socket/chat';

import Icon from '../../ui/Icon/Icon';

import './Form.scss';

function Form() {
  const [currentMessage, setCurrentMessage] = useState('');

  const pseudo = useAppSelector((state) => state.settings.pseudo);

  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentMessage(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (currentMessage.trim()) {
      // dispatch(
      //   addMessage({
      //     id: getNextId(messages),
      //     author: pseudo ?? 'Anne Onyme', // en dur pour le moment
      //     content: currentMessage,
      //   })
      // );

      // Au lieu de dispatcher une action pour modifier mon état,
      // j'émets un évènement à mon serveur pour l'avertir
      // d'un nouveau message.
      // C'est au serveur de contacter tous les clients inscrits
      // en disant : « j'ai un nouveau message »
      sendMessage({
        // l'ID sera ré-écrit au niveau du serveur
        // pour TS, je lui envoie un faux ID
        id: 42,
        author: pseudo ?? 'Anne Onyme',
        content: currentMessage.trim(),
      });

      setCurrentMessage('');
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-input"
        placeholder="Saisissez votre message…"
        aria-label="Saisissez votre message"
        value={currentMessage}
        onChange={handleChange}
        ref={inputRef}
      />

      <button type="submit" className="form-button">
        <Icon icon="send" size="80%" />
      </button>
    </form>
  );
}

export default Form;
