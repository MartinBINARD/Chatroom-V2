import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { login, toggleSettings } from '../../../store/reducers/settings';

import Input from '../Input/Input';
import Icon from '../../ui/Icon/Icon';

import './Settings.scss';

function Settings() {
  const isOpen = useAppSelector((state) => state.settings.isOpen);
  const isLoading = useAppSelector((state) => state.settings.isLoading);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleSettings());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    // const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);
    // je veux dispatcher une action pour me connecter
    // → appel API : est-on dans la BDD ?
    // → « action asynchrone » = thunk
    dispatch(login(formData));
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
          name="email"
          type="email"
          className="settings-input"
          placeholder="Adresse E-mail"
          aria-label="Adresse E-mail"
        />
        <Input
          name="password"
          type="password"
          className="settings-input"
          placeholder="Mot de passe"
          aria-label="Mot de passe"
        />
        <button type="submit" className="settings-button" disabled={isLoading}>
          {isLoading ? 'Chargement…' : 'Se connecter'}
        </button>
      </form>
    </aside>
  );
}

export default Settings;
