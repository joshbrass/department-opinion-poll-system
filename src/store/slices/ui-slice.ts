import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state structure
interface UIState {
  addOptionModalShowing: boolean;
  voteOpinionModalShowing: boolean;
  opinionModalShowing: boolean;
  pollModalShowing: boolean;
  updatePollModalShowing: boolean;
  selectedPollId: string | null;
}

const initialState: UIState = {
  addOptionModalShowing: false,
  voteOpinionModalShowing: false,
  opinionModalShowing: false,
  pollModalShowing: false,
  updatePollModalShowing: false,
  selectedPollId: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openPollModal(state) {
      state.pollModalShowing = true;
    },
    closePollModal(state) {
      state.pollModalShowing = false;
    },
    openAddOptionModal(state) {
      state.addOptionModalShowing = true;
    },
    closeAddOptionModal(state) {
      state.addOptionModalShowing = false;
    },
    openVoteOpinionModal(state) {
      state.voteOpinionModalShowing = true;
    },
    closeVoteOpinionModal(state) {
      state.voteOpinionModalShowing = false;
    },
    openOpinionModal(state) {
      state.opinionModalShowing = true;
    },
    closeOpinionModal(state) {
      state.opinionModalShowing = false;
    },
    openUpdatePollModal(state) {
      state.updatePollModalShowing = true;
    },
    closeUpdatePollModal(state) {
      state.updatePollModalShowing = false;
      state.selectedPollId = null;
    },
    setSelectedPollId(state, action: PayloadAction<string>) {
      state.selectedPollId = action.payload;
    },
    clearSelectedPollId(state) {
      state.selectedPollId = null;
    },
  },
});

export const UiActions = uiSlice.actions;
export default uiSlice;