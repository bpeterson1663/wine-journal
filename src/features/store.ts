import { type Action, configureStore, type ThunkAction } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import tastingReducer from './tasting/tastingSlice'
import userReducer from './user/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasting: tastingReducer,
    user: userReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
