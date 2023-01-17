import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import userReducer from './user/userSlice'
import varietalReducer from './varietal/varietalSlice'
import tastingReducer from './tasting/tastingSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasting: tastingReducer,
    user: userReducer,
    varietal: varietalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
