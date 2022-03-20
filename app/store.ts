import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";

import wsReducer from "../features/ws/wsSlice";
// redux persist import requirements
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";

// just to organise reducers into one single reducer
const reducer = combineReducers({
  user: userReducer,
  ws: wsReducer,
});

// probably some default persist format
const persistConfig = {
  key: "root",
  storage,
  // blacklist: ["ws"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
  });
}

let store = makeStore();
let persistor = persistStore(store);
export { store, persistor };
export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
