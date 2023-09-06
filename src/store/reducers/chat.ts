import { createAction, createReducer } from '@reduxjs/toolkit';

import { Message } from '../../@types';

interface ChatState {
  messages: Message[];
}

const initialState: ChatState = {
  messages: [
    // {
    //   id: 1,
    //   author: 'Super Chat',
    //   content: 'Salut ça va ?',
    // },
    // {
    //   id: 2,
    //   author: 'Super Chat',
    //   content: "T'as pas des super-croquettes ?",
    // },
    // {
    //   id: 3,
    //   author: 'Super Chat',
    //   content: 'Stp',
    // },
  ],
};

export const addMessage = createAction<Message>('chat/add-message');

const chatReducer = createReducer(initialState, (builder) => {
  builder.addCase(addMessage, (state, action) => {
    state.messages.push(action.payload);
  });
});

export default chatReducer;
