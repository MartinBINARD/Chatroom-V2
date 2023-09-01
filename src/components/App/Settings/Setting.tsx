import './Setting.scss';

function Settings() {
  return (
    <aside className="settings">
      <button type="button" className="settings-close">
        Fermer
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
  );
}

export default Settings;
