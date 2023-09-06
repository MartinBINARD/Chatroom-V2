import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { Flash } from '../../@types';

interface SettingsState {
  isOpen: boolean;
  isLoading: boolean;
  pseudo: string | null;
  flash: Flash | null;
}

const initialState: SettingsState = {
  isOpen: true,
  isLoading: false,
  pseudo: null,
  flash: null,
};

export const toggleSettings = createAction('settings/toggle');
export const logout = createAction('settings/logout');

/*
  « Action asynchrone » = thunk → createAsyncThunk(name, asyncFunction)

  Le thunk va générer 3 actions en fonctions de l'état de la Promesse :

    - thunk.pending : la promesse est en cours d'exécution
    - thunk.fulfilled : la promesse est résolue
    - thunk.rejected : la promesse a échoué
*/
export const login = createAsyncThunk(
  'settings/login',
  async (formData: FormData, thunkAPI) => {
    console.log(thunkAPI);
    console.log(thunkAPI.getState());

    const objData = Object.fromEntries(formData.entries());
    const { data } = await axios.post('http://localhost:3001/login', objData);

    // ici, je retourne mon résultat qui sera automatiquement
    // ajouté au payload de mon action `login.fulfilled`
    return data as { pseudo: string };
  }
);

const settingsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleSettings, (state) => {
      state.isOpen = !state.isOpen;
    })
    .addCase(logout, (state) => {
      state.pseudo = null;
    })
    .addCase(login.pending, (state, action) => {
      // console.log(action);
      state.isLoading = true;
      // à chaque appel API, je ré-initialise mes messages d'erreurs
      state.flash = null;
    })
    // la promesse est résolue
    .addCase(login.fulfilled, (state, action) => {
      console.log(action);
      // je récupère directement la réponse de l'API dans le payload de l'action
      state.isLoading = false;
      // j'enregistre la réponse dans mon state
      state.pseudo = action.payload.pseudo;
      state.flash = {
        type: 'success',
        duration: 2000,
        children: `Bienvenue ${action.payload.pseudo} !`,
      };
      state.isOpen = false;
    })
    // la promesse est rejetée
    .addCase(login.rejected, (state, action) => {
      console.log(action);
      // je récupère l'erreur directement dans `action.error`
      state.isLoading = false;
      // je gère les erreurs
      state.flash = {
        type: 'error',
        // duration: 5000,
        children: action.error.code || 'UNKNOWN_ERROR',
      };
    });
});

export default settingsReducer;
