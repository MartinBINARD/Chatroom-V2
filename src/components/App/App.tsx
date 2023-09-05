import Form from './Form/Form';
import Messages from './Messages/Messages';
import Settings from './Settings/Setting';
import FlashMessage from './FlashMessage/FlashMessage';

import './App.scss';

function App() {
  return (
    <div className="App">
      <FlashMessage type="error" duration={1000}>
        Mon super Message
      </FlashMessage>
      <Settings />
      <Messages />
      <Form />
    </div>
  );
}

export default App;
