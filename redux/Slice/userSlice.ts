// features/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string | null; // Allow null
  displayName: string | null; // Allow null
}

const initialState: UserState = {
  email: null,
  displayName: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
    },
    logout: (state) => {
      state.email = null;
      state.displayName = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
