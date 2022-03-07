import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrentUser, SignUpT, FetchStatusT, MessageT, AuthUserT } from '../../types'
import { RootState, AppThunk } from '../store'
import { createAuthenticatedUser, loginUser } from '../../api'

interface InitialAuthState {
  currentUser: CurrentUser
  status: FetchStatusT
  message: MessageT
}

const initialState: InitialAuthState = {
  currentUser: null,
  message: null,
  status: 'idle',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart: (state) => {
      state.status = 'loading'
    },
    authSuccess: (state, action: PayloadAction<AuthUserT>) => {
      state.status = 'success'
      state.currentUser = action.payload
      state.message = null
    },
    authFailure: (state, action: PayloadAction<MessageT>) => {
      state.status = 'error'
      state.currentUser = null
      state.message = action.payload
    },
    signOut: (state) => {
      state.currentUser = null
      state.message = 'success'
    },
  },
})

export const { authStart, authSuccess, authFailure, signOut } = authSlice.actions

export const signUp =
  (payload: SignUpT): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(authStart())
      const response = await createAuthenticatedUser(payload)
      const { success, data, message } = response
      if (success && data?.email) {
        dispatch(authSuccess(data))
      } else {
        dispatch(authFailure(message))
      }
    } catch (err) {
      dispatch(authFailure(`error ${err}`))
    }
  }

export const login =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(authStart())
      const { success, data, message } = await loginUser(email, password)
      if (success && data) {
        dispatch(authSuccess(data))
      } else {
        dispatch(authFailure(message))
      }
    } catch (err) {
      dispatch(authFailure(`error ${err}`))
    }
  }

export const authSelector = (state: RootState) => state.auth

export default authSlice.reducer
