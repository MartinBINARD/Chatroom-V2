import { createAction, createReducer } from '@reduxjs/toolkit';

import { Settings, TisOpen } from '../../@types';

// Préparation des interfaces les actions champs futurs
interface SettingsState {
  settings: Settings;
}

// Interface provisoire de l'état de isOpen : boolean
interface IsOpen {
  isOpen: TisOpen;
}

const initialStateIsOpen: IsOpen = {
  isOpen: false,
};

export const toggleSettings = createAction<TisOpen>('settings/toggle-settings');

const settingsReducer = createReducer(initialStateIsOpen, (builder) => {
  builder.addCase(toggleSettings, (state, action) => {
    state.isOpen = !state.isOpen;
  });
});

export default settingsReducer;
