import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/redux';

import { toggleSettings } from '../../../store/reducers/settings';
import './Setting.scss';

function Settings() {
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

        <form className="settings-form">
          <input
            type="email"
            className="settings-form-input"
            placeholder="Email"
            aria-label="email"
          />
          <input
            type="password"
            className="settings-form-input"
            placeholder="Mot de passe"
            aria-label="Mot de passe"
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
