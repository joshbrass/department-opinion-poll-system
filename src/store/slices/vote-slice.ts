import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state structure
interface VoteState {
  selectedVoterOption: string; // ID of selected option (e.g., "o1")
  currentVoter: {
    id: string;
    token: string;
    isAdmin: boolean;
  };
  selectedPoll: string; // Poll ID being viewed or voted on
  idOfPollToUpdate: string; // Used when updating a poll
  addOptionPollId: string; // Used when adding a new option to a poll
}

// Correct current voter (admin in your data is user with id "l1")
const currentVoter = {
  id: 'l1',
  token: 'admin-token-123', // token can be anything for mock
  isAdmin: true,
};

const initialState: VoteState = {
  selectedVoterOption: '',
  currentVoter,
  selectedPoll: '',
  idOfPollToUpdate: '',
  addOptionPollId: '',
};

const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {
    changeSelectedVoteOption(state, action: PayloadAction<string>) {
      state.selectedVoterOption = action.payload;
    },
    changeSelectedPoll(state, action: PayloadAction<string>) {
      state.selectedPoll = action.payload;
    },
    changeIdOfPollToUpdate(state, action: PayloadAction<string>) {
      state.idOfPollToUpdate = action.payload;
    },
    changeAddOptionPollId(state, action: PayloadAction<string>) {
      state.addOptionPollId = action.payload;
    },
  },
});

export const voteActions = voteSlice.actions;
export default voteSlice;