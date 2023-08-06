import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createUserProfile, getUserProfileById } from '../../api'
import { FetchStatusT, MessageT, UserProfileT } from '../../types'
import { AppThunk, RootState } from '../store'

interface InitialUserState {
  userProfile: UserProfileT | null
  status: FetchStatusT
  message: MessageT
}

const initialState: InitialUserState = {
  userProfile: null,
  status: 'idle',
  message: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userStart: state => {
      state.status = 'loading'
    },
    userFetchSuccess: (state, action: PayloadAction<UserProfileT>) => {
      state.status = 'success'
      state.userProfile = action.payload
    },
    userFetchFailure: (state, action: PayloadAction<MessageT>) => {
      state.status = 'error'
      state.userProfile = null
      state.message = action.payload
    }
  }
})

export const { userStart, userFetchSuccess, userFetchFailure } = userSlice.actions

export const fetchUserStart =
  (id: string): AppThunk =>
    async dispatch => {
      try {
        dispatch(userStart())
        const response = await getUserProfileById(id)
        const { success, message, data } = response
        if (success) {
          dispatch(userFetchSuccess(data as UserProfileT))
        } else {
          dispatch(userFetchFailure(message))
        }
      } catch (err) {
        console.error(err)
        dispatch(userFetchFailure('error occurred'))
      }
    }

export const fetchUserCreateStart =
  (profile: UserProfileT): AppThunk =>
    async dispatch => {
      try {
        dispatch(userStart())
        const response = await createUserProfile(profile)
        const { success, message, data } = response
        if (success) {
          dispatch(userFetchSuccess(data as UserProfileT))
        } else {
          dispatch(userFetchFailure(message))
        }
      } catch (err) {
        console.error(err)
        dispatch(userFetchFailure('error occurred'))
      }
    }

export const userSelector = (state: RootState) => state.user

export default userSlice.reducer
