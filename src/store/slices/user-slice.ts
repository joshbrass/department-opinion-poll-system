import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    changeSelectedUserOption(state, action: PayloadAction<string>) {
      state.selectedUserOption = action.payload;
    },
    changeSelectedPoll(state, action: PayloadAction<string>) {
      state.selectedPoll = action.payload;
    },
    changeCurrentUser(
      state,
      action: PayloadAction<{ id: string; token: string; isAdmin: boolean } | null>
    ) {
      state.currentUser = action.payload; 
    },
    changePollIdToUpdate(state, action: PayloadAction<string>) {
      state.pollIdToUpdate = action.payload;
    },
    changePollIdForNewOption(state, action: PayloadAction<string>) {
      state.pollIdForNewOption = action.payload;
    },
    // ONLY NEW ADDITION: logout reducer
    logoutUser(state) {
      state.currentUser = null;
      state.selectedUserOption = ''; // Reset selected option on logout
    }
  },
});

export const userActions = userSlice.actions;
export default userSlice;