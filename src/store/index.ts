import { configureStore } from '@reduxjs/toolkit';

import chatReducer from './reducers/chat';
import settingsReducer from './reducers/settings';

const store = configureStore({
  reducer: {
    chat: chatReducer,
    settings: settingsReducer,
  },
});

export default store;
// Je déduis le type `RootState` et `AppDispatch` depuis le store lui même
export type RootState = ReturnType<typeof store.getState>;
