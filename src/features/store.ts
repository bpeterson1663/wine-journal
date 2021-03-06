import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import wineReducer from './wine/wineSlice'
import userReducer from './user/userSlice'
import varietalReducer from './varietal/varietalSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wine: wineReducer,
    user: userReducer,
    varietal: varietalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
