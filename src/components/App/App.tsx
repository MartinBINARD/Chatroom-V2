import { useAppSelector } from '../../hooks/redux';

import Form from './Form/Form';
import Messages from './Messages/Messages';
import Settings from './Settings/Settings';
import FlashMessage from './FlashMessage/FlashMessage';

import './App.scss';

/*
  Objectif (?)
  wizz/shake →https://css-tricks.com/snippets/css/shake-css-keyframe-animation/

  idée : 
  1. on crée un bouton
  2. on émet un socket event
  3. (côté back) on écoute cet event et on en émet un autre
  pour faire shaker tout le monde
  4. (front) on écoute l'évènement su serveur
  5. on ajoute une classe sur APP
  6. système (timer) pour supprimer la classe ?

  nom : o'Lea !
*/

function App() {
  const flash = useAppSelector((state) => state.settings.flash);

  return (
    <div className="App">
      {flash && (
        <FlashMessage type={flash.type} duration={flash.duration ?? 3000}>
          {flash.children}
        </FlashMessage>
      )}
      <Settings />
      <Messages />
      <Form />
    </div>
  );
}

export default App;
