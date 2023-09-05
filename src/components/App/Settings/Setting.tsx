import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/redux';

import { toggleSettings } from '../../../store/reducers/settings';

import Icon from '../../ui/Icon/Icon';

import './Setting.scss';

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
        <input
          type="email"
          className="settings-input"
          placeholder="Adresse E-mail"
          aria-label="Adresse E-mail"
        />
        <input
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
