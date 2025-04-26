import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  difficultyLevel: string;
  avatar: string;
  background: string;
  frame: string;
  coins: number;
  points: number;
  progress: number;
  gamesPassed: string[];
  ownedAvatars: string[];
  ownedBackgrounds: string[];
  ownedFrames: string[];
}

const initialState: UserState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  difficultyLevel: '',
  avatar: '',
  background: '',
  frame: '',
  coins: 0,
  points: 0,
  progress: 0,
  gamesPassed: [],
  ownedAvatars: [],
  ownedBackgrounds: [],
  ownedFrames: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.difficultyLevel = action.payload.difficultyLevel;
      state.avatar = action.payload.avatar;
      state.background = action.payload.background;
      state.frame = action.payload.frame;
      state.coins = action.payload.coins;
      state.progress = action.payload.progress;
      state.points = action.payload.points;
      state.ownedAvatars = action.payload.ownedAvatars;
      state.ownedFrames = action.payload.ownedFrames;
      state.ownedBackgrounds = action.payload.ownedBackgrounds;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
