import { type Action, configureStore, type ThunkAction } from '@reduxjs/toolkit'
import authReducer from 'features/auth/authSlice'
import tastingReducer from 'features/tasting/tastingSlice'
import userReducer from 'features/user/userSlice'
import cellarReducer from 'features/cellar/cellarSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasting: tastingReducer,
    user: userReducer,
    cellar: cellarReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
