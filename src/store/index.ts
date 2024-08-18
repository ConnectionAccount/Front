import { persistStore, persistReducer } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "./storage";
import { Auth } from "@/models/auth";
import { authReducer } from "./auth-slice";
import { generalReducer } from "./general-slice";
import { IGeneral } from "@/interface/general";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

export interface RootState {
  auth: Auth;
  general: IGeneral;
}

const rootReducer = combineReducers({
  auth: authReducer,
  general: generalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

persistStore(store);

export { store };
