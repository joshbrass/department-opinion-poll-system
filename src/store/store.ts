import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './slices/ui-slice';
import userSlice from './slices/user-slice';


// Configure the Redux store
export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    user: userSlice.reducer

    
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 






