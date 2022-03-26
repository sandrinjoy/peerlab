import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 5);
type User = {
  name: string;
  labs: string[];
};

type cartState = User;

const initialState: cartState = {
  name: nanoid(),
  labs: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addLab: (state, action: PayloadAction<string>) => {
      state.labs.push(action.payload);
    },
    removeLab: (state, action: PayloadAction<string>) => {
      return {
        name: state.name,
        labs: state.labs.filter((x) => {
          return x !== action.payload;
        }),
      };
    },
  },
});

// export reducers of the reservationsslice Object, which is basically functions
export default userSlice.reducer;
// export actions
export const { addLab, removeLab } = userSlice.actions;
