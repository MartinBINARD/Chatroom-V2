import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/redux';

import { toggleSettings } from '../../../store/reducers/settings';
import './Setting.scss';

function Settings() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleSubmit(event: React.FormEvent<HTMLElement>) {
    event.preventDefault();

    console.log(event);
  }

  const toggle = useAppSelector((state) => state.settings.isOpen);

  const dispatch = useDispatch();

  function handleToggle() {
    dispatch(toggleSettings(toggle));
  }

  return (
    <>
      <aside className={`settings ${toggle && 'active'}`}>
        <button
          type="button"
          className="settings-close-button"
          onClick={handleToggle}
        >
          X
        </button>

        <form className="settings-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="settings-form-input"
            placeholder="Email"
            aria-label="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            className="settings-form-input"
            placeholder="Mot de passe"
            aria-label="Mot de passe"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit" className="settings-form-button">
            Envoyer
          </button>
        </form>
      </aside>

      <aside className={`open-settings ${!toggle && 'active'}`}>
        <button
          type="button"
          className="open-settings-button"
          onClick={handleToggle}
        >
          +
        </button>
      </aside>
    </>
  );
}

export default Settings;
