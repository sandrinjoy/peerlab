import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 5);
type User = {
  id: string;
  labs: string[];
};

type cartState = User;

const initialState: cartState = {
  id: nanoid(),
  labs: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    newId: (state) => {
      return { id: nanoid(), labs: state.labs };
    },
    changeId: (state, action: PayloadAction<string>) => {
      return { id: action.payload, labs: state.labs };
    },
    addLab: (state, action: PayloadAction<string>) => {
      state.labs.push(action.payload);
    },
    removeLab: (state, action: PayloadAction<string>) => {
      return {
        id: state.id,
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
export const { changeId, addLab, removeLab, newId } = userSlice.actions;
