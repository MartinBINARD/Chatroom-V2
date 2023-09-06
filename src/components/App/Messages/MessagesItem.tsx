import classNames from 'classnames';
import { useAppSelector } from '../../../hooks/redux';

import { Message } from '../../../@types';

function MessagesItem({ author, content }: Message) {
  // const pseudo = useAppSelector((state) => state.settings.pseudo);
  /*
    Optimisation :
    avec ce code, à chaque fois que `pseudo` est mis à jour,
    TOUS LES MESSAGES sont re-rendus
    
    on peut affiner notre sélecteur pour ne cibler que les messages
    qui doivent être re-rendus :
    seulement les messages qui avaient comme auteur le pseudo connecté
    ou les messages ayant pour auteur le pseudo nouvellement connecté.
  */
  // const pseudo = useAppSelector((state) => state.settings.pseudo);
  // j'abonne mon composant au calcul de mon sélecteur :
  // si pseudo === 'Burt' et author === 'Burt',
  //   - `isMine` === true
  //   - tous les autres messages seront à `false`
  // je me déconnecte (pseudo === null) :
  //   - les messages de Burt passent à `false`
  //   - tous les autres RESTENT à false
  // SEULS les messages de Burt DOIVENT être re-rendus
  const isMine = useAppSelector((state) => state.settings.pseudo === author);

  return (
    <article
      className={classNames('messages-item', {
        'messages-item--mine': isMine,
      })}
    >
      <p className="messages-item__author">{author}</p>
      <p className="messages-item__content">{content}</p>
    </article>
  );
}

export default MessagesItem;
