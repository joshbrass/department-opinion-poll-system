import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  selectedUserOption: string;
  currentUser: {
    id: string;
    token: string;
    isAdmin: boolean;
  } | null;
  selectedPoll: string;
  pollIdToUpdate: string;
  pollIdForNewOption: string;
}

const initialState: UserState = {
  selectedUserOption: '',
  currentUser: null,
  selectedPoll: '',
  pollIdToUpdate: '',
  pollIdForNewOption: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeSelectedUserOption(state: UserState, action: PayloadAction<string>) {
      state.selectedUserOption = action.payload;
    },
    changeSelectedPoll(state: UserState, action: PayloadAction<string>) {
      state.selectedPoll = action.payload;
    },
    changeCurrentUser(
      state: UserState,
      action: PayloadAction<{ id: string; token: string; isAdmin: boolean } | null>
    ) {
      state.currentUser = action.payload;
    },
    changePollIdToUpdate(state: UserState, action: PayloadAction<string>) {
      state.pollIdToUpdate = action.payload;
    },
    changePollIdForNewOption(state: UserState, action: PayloadAction<string>) {
      state.pollIdForNewOption = action.payload;
    },
    logoutUser(state: UserState) {
      state.currentUser = null;
      state.selectedUserOption = '';
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;