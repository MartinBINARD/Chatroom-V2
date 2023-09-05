import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/redux';

import { toggleSettings } from '../../../store/reducers/settings';

import Input from '../Input/Input';
import Icon from '../../ui/Icon/Icon';

import './Setting.scss';

/*
  Pour gérer le formulaire de connexion,
  il faut contrôler nos 2 champs :

    - variable d'état LOCAL → `useState`
    - lire cette variable et l'affichage → `value`
    - modifier cette valeur → `onChange`

  nous avons avons aussi besoin d'identifier nos champs
  pour facilement pouvoir récupérer leurs valeurs à la soumission
  → `name`

  Tout les reste est « optionnel » (className, placeholder, type…).

  Au lieu de répéter la même chose pour gérer nos champs,
  on peut créer un composant dont le seul rôle sera de
  contrôler le champ.
*/

function Settings() {
  /*
    `useAppSelector` : version TS de `useSelector` (voir custom hooks)

    - lit le state = `store.getState()`
        → on récupère une valeur du state
    - abonne aux modifications = `store.subscribe()`
        → abonne le Composant aux modifications de ce qui est retourné
        par le sélecteur
  */
  const isOpen = useAppSelector((state) => state.settings.isOpen);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleSettings());
  };

  return (
    /*
      classNames est une fonction
      (à importer : https://www.npmjs.com/package/classnames)
      qui va nous permettre de gérer facilement les classes CSS.

      classNames('foo', 'bar'); // => 'foo bar'
      classNames('foo', { bar: true }); // => 'foo bar'
      classNames('foo', { bar: false }); // => 'foo'
    */
    <aside className={classNames('settings', { 'settings--open': isOpen })}>
      <button
        type="button"
        className="settings-toggler"
        title="Ouvrir le formulaire de connexion"
        onClick={handleClick}
      >
        <Icon icon="plus" size="80%" />
      </button>

      <form className="settings-form">
        <Input
          // prop OBLIGATOIRE
          name="mail"
          // props OPTIONNELLES
          type="email"
          className="settings-input"
          placeholder="Adresse E-mail"
          aria-label="Adresse E-mail"
        />
        <Input
          name="pwd"
          type="password"
          className="settings-input"
          placeholder="Mot de passe"
          aria-label="Mot de passe"
        />
        <button type="submit" className="settings-button">
          Se connecter
        </button>
      </form>
    </aside>
  );
}

export default Settings;
