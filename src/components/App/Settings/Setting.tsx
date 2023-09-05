import './Setting.scss';

function Settings() {
  return (
    <aside className="settings">
      <button
        type="button"
        className="settings-toggler"
        title="Ouvrir le formulaire de connexion"
      >
        +
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
