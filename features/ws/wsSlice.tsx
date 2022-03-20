import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// type message = {
//   id: number;
//   message: string;
//   sender: string;
//   room: string;
// };
// type Socket = {
//   id: string;
//   messages: message[];
// };
type wsState = { currentWS: null | WebSocket; status: boolean };

const initialState: wsState = { currentWS: null, status: false };

export const wsSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<wsState>) => action.payload,
    setStatus: (state, action: PayloadAction<boolean>) => {
      return { currentWS: state.currentWS, status: action.payload };
    },
  },
});

// export reducers of the reservationsslice Object, which is basically functions
export default wsSlice.reducer;
// export actions
export const { setSocket, setStatus } = wsSlice.actions;
