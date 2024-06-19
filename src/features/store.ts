import { type Action, type ThunkAction, configureStore } from "@reduxjs/toolkit";
import authReducer from "features/auth/authSlice";
import cellarReducer from "features/cellar/cellarSlice";
import planReducer from "features/plan/planSlice";
import tastingReducer from "features/tasting/tastingSlice";
import userReducer from "features/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasting: tastingReducer,
    user: userReducer,
    cellar: cellarReducer,
    plan: planReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
