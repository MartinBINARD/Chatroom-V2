import { createAction, createReducer } from '@reduxjs/toolkit';

import { Settings, TisOpen } from '../../@types';

const initialState: Settings = {
  isOpen: false,
  email: '',
  password: '',
};

export const toggleSettings = createAction<TisOpen>('settings/toggle-settings');

const settingsReducer = createReducer(initialState, (builder) => {
  builder.addCase(toggleSettings, (state, action) => {
    state.isOpen = !state.isOpen;
  });
});

export default settingsReducer;
