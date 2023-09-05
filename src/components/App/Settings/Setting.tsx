import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/redux';

import { login, toggleSettings } from '../../../store/reducers/settings';

import Input from '../Input/Input';
import Icon from '../../ui/Icon/Icon';

import './Setting.scss';

function Settings() {
  const isOpen = useAppSelector((state) => state.settings.isOpen);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleSettings());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);
    // je veux dispatcher une action pour me connecter
    // → appel API : est-on dans la BDD ?
    // → « action asynchrone » = thunk
    dispatch(login());
  };

  return (
    <aside className={classNames('settings', { 'settings--open': isOpen })}>
      <button
        type="button"
        className="settings-toggler"
        title="Ouvrir le formulaire de connexion"
        onClick={handleClick}
      >
        <Icon icon="plus" size="80%" />
      </button>

      <form className="settings-form" onSubmit={handleSubmit}>
        <Input
          name="mail"
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
