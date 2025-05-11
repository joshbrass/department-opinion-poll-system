import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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
    openPollModal(state: UIState) {
      state.pollModalShowing = true;
    },
    closePollModal(state: UIState) {
      state.pollModalShowing = false;
    },
    openAddOptionModal(state: UIState) {
      state.addOptionModalShowing = true;
    },
    closeAddOptionModal(state: UIState) {
      state.addOptionModalShowing = false;
    },
    openVoteOpinionModal(state: UIState) {
      state.voteOpinionModalShowing = true;
    },
    closeVoteOpinionModal(state: UIState) {
      state.voteOpinionModalShowing = false;
    },
    openOpinionModal(state: UIState) {
      state.opinionModalShowing = true;
    },
    closeOpinionModal(state: UIState) {
      state.opinionModalShowing = false;
    },
    openUpdatePollModal(state: UIState) {
      state.updatePollModalShowing = true;
    },
    closeUpdatePollModal(state: UIState) {
      state.updatePollModalShowing = false;
      state.selectedPollId = null;
    },
    setSelectedPollId(state: UIState, action: PayloadAction<string>) {
      state.selectedPollId = action.payload;
    },
    clearSelectedPollId(state: UIState) {
      state.selectedPollId = null;
    },
  },
});

export const UiActions = uiSlice.actions;
export default uiSlice.reducer;