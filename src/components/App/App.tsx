import Form from './Form/Form';
import Messages from './Messages/Messages';
import Settings from './Settings/Setting';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Settings />
      <Messages />
      <Form />
    </div>
  );
}

export default App;
