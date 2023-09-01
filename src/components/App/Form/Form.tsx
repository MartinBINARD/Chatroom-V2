import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/redux';

import { addMessage, changeCurrentMessage } from '../../../store/reducers/chat';
import { getNextId } from '../../../selectors';

import './Form.scss';

function Form() {
  /*
    Pour rappel, les champs de formulaires DOIVENT être contrôlés.

    MAIS on ne les contrôle pas dans Redux :
    le contrôle se fait souvent sur l'évènement `onChange`,
    inutile de dispatcher une action à chaque saisie de l'utilisateur.

    Même Redux le dit :
    https://redux.js.org/tutorials/fundamentals/part-5-ui-react#global-state-component-state-and-forms
    
    La procédure :
    - je contrôle mon champ avec un _state_ (React) local → `useState`
    - à la soumission, je dispatche une action avec le contenu de mon champ
    pour modifier mon _state_ (Redux) global
    
    Ici et à BUT PÉDAGOGIQUE (pour s'exercer à Redux), je vais contrôler
    mon champ dans Redux (Booooh ! Remboursé !).
    Je ferai un commit rectificatif par la suite pour avoir une belle application…
  */

  // Les champs sont à contrôler en local
  // const currentMessage = useAppSelector((state) => state.chat.currentMessage);
  const [currentMessage, setCurrentMessage] = useState('');

  const messages = useAppSelector((state) => state.chat.messages);

  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // // j'affiche mon intention
    // // console.log(
    // //   `je veux modifier la valeur de "currentMessage" dans mon state global
    // //   avec la valeur de mon input`
    // // );
    // // state global = state dans le store
    // // modifier le store → dispatcher une action
    // // cette action sera récupérer dans le reducer pour modifier le state
    // // on doit fournir la valeur du input

    // // j'émets mon action
    // dispatch(changeCurrentMessage(event.target.value));
    setCurrentMessage(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // j'envoie mon action seulement si j'ai une saisie utilisateur
    if (currentMessage.trim()) {
      dispatch(
        addMessage({
          id: getNextId(messages), // TODO: générer un ID
          author: 'Super Chat', // en dur pour le moment
          content: currentMessage, // valeur depuis mon état
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
        // champ contrôlé : lecture
        value={currentMessage}
        // champ contrôlé : modification
        onChange={handleChange}
        // référence
        ref={inputRef}
      />

      <button type="submit" className="form-button">
        OK
      </button>
    </form>
  );
}

export default Form;
