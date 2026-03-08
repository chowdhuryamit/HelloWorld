import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string | null;
  email: string | null;
  id:string | null
}

const initialState: UserState = {
  name: null,
  email: null,
  id:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email
      state.id = action.payload.id;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;