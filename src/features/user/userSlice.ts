import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrentUser, SignUpT, FetchStatusT, MessageT, UserT, AuthUserT } from '../../types'
import { RootState, AppThunk } from '../store'
import { createAuthenticatedUser, loginUser } from '../../api'

interface InitialUserState {
  currentUser: CurrentUser
  status: FetchStatusT
  message: MessageT
}

const initialState: InitialUserState = {
  currentUser: null,
  message: null,
  status: 'idle',
}

export const userSlice = createSlice({
  name: 'user',
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

export const { authStart, authSuccess, authFailure, signOut } = userSlice.actions

export const signUp =
  (payload: SignUpT): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(authStart())
      const response = await createAuthenticatedUser(payload)
      const { success, data, message } = response
      if (success && data) {
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

export const userSelector = (state: RootState) => state.user

export default userSlice.reducer
