import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './slices/ui-slice';
import voteSlice from './slices/vote-slice';
// Configure the Redux store
export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        vote: voteSlice.reducer
    },
});
