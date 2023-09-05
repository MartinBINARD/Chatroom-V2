import { createAction, createReducer } from '@reduxjs/toolkit';

interface SettingsState {
  isOpen: boolean;
}

const initialState: SettingsState = {
  isOpen: false,
};

export const toggleSettings = createAction('settings/toggle');

const settingsReducer = createReducer(initialState, (builder) => {
  builder.addCase(toggleSettings, (state) => {
    state.isOpen = !state.isOpen;
  });
});

export default settingsReducer;
