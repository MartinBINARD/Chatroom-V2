import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axios from 'axios';

interface SettingsState {
  isOpen: boolean;
  isLoading: boolean;
  pseudo: string | null;
  message: string | null;
}

const initialState: SettingsState = {
  isOpen: true,
  isLoading: false,
  pseudo: null,
  message: null,
};

export const toggleSettings = createAction('settings/toggle');

/*
  « Action asynchrone » = thunk → createAsyncThunk(name, asyncFunction)

  Le thunk va générer 3 actions en fonctions de l'état de la Promesse :

    - thunk.pending : la promesse est en cours d'exécution
    - thunk.fulfilled : la promesse est résolue
    - thunk.rejected : la promesse a échoué
*/
export const login = createAsyncThunk('settings/login', async () => {
  const { data } = await axios.post('http://localhost:3001/login', {
    email: 'bouclierman@herocorp.io',
    password: 'jennifer',
  });

  console.log(data);
  // ici, je retourne mon résultat qui sera automatiquement
  // ajouté au payload de mon action `login.fulfilled`
  return data;
});

const settingsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleSettings, (state) => {
      state.isOpen = !state.isOpen;
    })
    .addCase(login.pending, (state, action) => {
      // console.log(action);
      state.isLoading = true;
    })
    // la promesse est résolue
    .addCase(login.fulfilled, (state, action) => {
      console.log(action);
      // je récupère directement la réponse de l'API dans le payload de l'action
      state.isLoading = false;
      // j'enregiste la réponse dans mon state
      state.pseudo = action.payload.pseudo;
    })
    // la promesse est rejetée
    .addCase(login.rejected, (state, action) => {
      console.log(action);
      // je récupère l'erreur directement dans `action.error`
      state.isLoading = false;
      // je gère les erreurs
      state.message = action.error.code || 'UNKNOWN_ERROR';
    });
});

export default settingsReducer;
