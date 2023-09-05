import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/redux';

import { addMessage } from '../../../store/reducers/chat';
import { getNextId } from '../../../store/selectors';

import Icon from '../../ui/Icon/Icon';

import './Form.scss';

function Form() {
  const [currentMessage, setCurrentMessage] = useState('');

  const messages = useAppSelector((state) => state.chat.messages);
  const pseudo = useAppSelector((state) => state.settings.pseudo);

  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentMessage(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (currentMessage.trim()) {
      dispatch(
        addMessage({
          id: getNextId(messages),
          author: pseudo ?? 'Anne Onyme', // en dur pour le moment
          content: currentMessage,
        })
      );

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
