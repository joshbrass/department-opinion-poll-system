import { createSlice } from '@reduxjs/toolkit';

// Correct current voter (admin in your data is user with id "l1")
const currentVoter = {
  id: 'l1',
  token: 'admin-token-123', // token can be anything for mock
  isAdmin: true,
};

const initialState = {
  selectedVoterOption: '',      // ID of selected option (e.g., "o1")
  currentVoter,                 // Logged-in user info
  selectedPoll: '',             // Poll ID being viewed or voted on
  idOfPollToUpdate: '',         // Used when updating a poll
  addOptionPollId: '',          // Used when adding a new option to a poll
};

const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {
    changeSelectedVoteOption(state, action) {
      state.selectedVoterOption = action.payload;
    },
    changeSelectedPoll(state, action) {
      state.selectedPoll = action.payload;
    },
    changeIdOfPollToUpdate(state, action) {
      state.idOfPollToUpdate = action.payload;
    },
    changeAddOptionPollId(state, action) {
      state.addOptionPollId = action.payload;
    },
  },
});

export const voteActions = voteSlice.actions;
export default voteSlice;
