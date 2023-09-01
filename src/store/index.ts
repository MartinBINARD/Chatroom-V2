import { configureStore } from '@reduxjs/toolkit';

import chatReducer from './reducers/chat';

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export default store;
// Je déduis le type `RootState` et `AppDispatch` depuis le store lui même
export type RootState = ReturnType<typeof store.getState>;
