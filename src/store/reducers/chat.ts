import { createAction, createReducer } from '@reduxjs/toolkit';

import { Message } from '../../@types';

interface ChatState {
  messages: Message[];
  // currentMessage: string;
}

const initialState: ChatState = {
  messages: [
    {
      id: 1,
      author: 'Super Chat',
      content: 'Salut ça va ?',
    },
    {
      id: 2,
      author: 'Super Chat',
      content: "T'as pas des super-croquettes ?",
    },
    {
      id: 3,
      author: 'Super Chat',
      content: 'Stp',
    },
    {
      id: 11,
      author: 'Super Chat',
      content: 'Salut ça va ?',
    },
    {
      id: 21,
      author: 'Super Chat',
      content: "T'as pas des super-croquettes ?",
    },
    {
      id: 31,
      author: 'Super Chat',
      content: 'Stp',
    },
    {
      id: 13,
      author: 'Super Chat',
      content: 'Salut ça va ?',
    },
    {
      id: 23,
      author: 'Super Chat',
      content: "T'as pas des super-croquettes ?",
    },
    {
      id: 33,
      author: 'Super Chat',
      content: 'Stp',
    },
  ],
  // currentMessage: '',
};

// // je vais récupérer une chaîne de caractères = la saisie utilisateur
// // → payload
// // → il faut typer mon action
// export const changeCurrentMessage = createAction<string>(
//   'chat/change-current-message'
// );

export const addMessage = createAction<Message>('chat/add-message');

const chatReducer = createReducer(initialState, (builder) => {
  builder
    // .addCase(changeCurrentMessage, (state, action) => {
    //   // je traduis mon action en modifiant le state
    //   state.currentMessage = action.payload;
    // })
    .addCase(addMessage, (state, action) => {
      // je traduis mon action
      state.messages.push(action.payload);
      // j'efface mon input
      // state.currentMessage = '';
    });
});

export default chatReducer;
