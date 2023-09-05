import { useAppSelector } from '../../hooks/redux';

import Form from './Form/Form';
import Messages from './Messages/Messages';
import Settings from './Settings/Settings';
import FlashMessage from './FlashMessage/FlashMessage';

import './App.scss';

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
