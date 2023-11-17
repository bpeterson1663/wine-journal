import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { FetchStatusT, MessageT, UserProfileT } from 'types'
import { RootState } from '../store'
import { addDoc, collection, doc, getDoc } from 'firebase/firestore/lite'
import { db } from '../../firebase'

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
  },
  extraReducers (builder) {
    builder
      .addCase(createUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload
      })
      .addCase(getUserProfileById.fulfilled, (state, action) => {
        state.userProfile = action.payload
      })
  }
})

export const userSelector = (state: RootState) => state.user

export default userSlice.reducer

export const createUserProfile = createAsyncThunk<UserProfileT, UserProfileT, {
  state: RootState
}>(
  'user/createUserProfile',
  async (data, { rejectWithValue }) => {
    try {
      const { firstName, lastName, userId } = data
      const docData = await addDoc(collection(db, 'users'), { firstName, lastName, userId })
      const userProfile = {
        ...data,
        id: docData.id
      }
      return userProfile as UserProfileT
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const getUserProfileById = createAsyncThunk<UserProfileT | null, string, {
  state: RootState
}>(
  'user/getUserProfileById',
  async (id, { rejectWithValue }) => {
    try {
      const docRef = doc(db, 'tastings', id)
      const docdata = await getDoc(docRef)
      if (docdata.exists()) {
        const data = docdata.data()

        const userProfile = {
          ...data,
          userId: data.id
        }
        return userProfile as UserProfileT
      } else {
        return null
      }
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)
