import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import {
  login,
  logout,
  toggleSettings,
} from '../../../store/reducers/settings';

import Input from '../Input/Input';
import Icon from '../../ui/Icon/Icon';

import useSound from '../../../hooks/useSound';
import whooshSound from '../../../assets/sounds/whoosh.mp3';

import './Settings.scss';

function Settings() {
  const isOpen = useAppSelector((state) => state.settings.isOpen);
  const isLoading = useAppSelector((state) => state.settings.isLoading);
  const pseudo = useAppSelector((state) => state.settings.pseudo);

  const playSound = useSound(whooshSound);

  const dispatch = useAppDispatch();

  // ajout d'une référence pour gérer un élément audio
  // const audioElement = useRef<HTMLAudioElement | null>(null);

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

  const handleLogout = () => {
    dispatch(logout());
  };

  // useEffect(() => {
  //   // j'attache mon élément audio
  //   audioElement.current = new Audio(whooshSound);
  // }, []);

  useEffect(() => {
    // lire le son à chaque fois que `messages` est modifié
    // if (audioElement.current) {
    //   //   je remets le son à 0 s
    //   audioElement.current.currentTime = 0;
    //   //   je lance le son
    //   audioElement.current.play();
    // }
    playSound();
  }, [isOpen, playSound]);

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

      {!pseudo && (
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
          <button
            type="submit"
            className="settings-button"
            disabled={isLoading}
          >
            {isLoading ? 'Chargement…' : 'Se connecter'}
          </button>
        </form>
      )}

      {pseudo && (
        // j'ai un pseudo, mon utilisateur est connecté
        <div className="settings-logged">
          <p>
            Vous êtes connecté en tant que
            <strong>{pseudo}</strong>
          </p>

          <button
            type="button"
            className="settings-button"
            onClick={handleLogout}
          >
            Se déconnecter
          </button>
        </div>
      )}
    </aside>
  );
}

export default Settings;
