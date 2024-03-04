import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { signInWithGooglePopup, auth } from '../../firebase'
import { AuthUserT, CurrentUser, FetchStatusT, MessageT, SignUpT, LoginT } from 'types'
import { RootState } from '../store'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, addDoc, collection } from 'firebase/firestore/lite'
import { db } from '../../firebase'
import { UserProfileT } from 'schemas/user'
import { defaultUserProfile } from 'schemas/user'

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
    setAuth: (state, action: PayloadAction<AuthUserT>) => {
      state.currentUser = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.currentUser = action.payload
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.currentUser = action.payload
      })
      .addCase(fetchLogout.fulfilled, (state, _) => {
        state.currentUser = null
      })
  },
})
export const { setAuth } = authSlice.actions

export const authSelector = (state: RootState) => state.auth

export default authSlice.reducer

export const fetchSignUp = createAsyncThunk<
  AuthUserT,
  SignUpT,
  {
    state: RootState
  }
>('auth/signUp', async (data, { rejectWithValue }) => {
  try {
    const { email, password } = data
    const authData = await createUserWithEmailAndPassword(auth, email, password)
    const authUser = {
      uid: authData.user.uid,
      email,
    }
    return authUser
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const fetchLogin = createAsyncThunk<
  AuthUserT,
  LoginT,
  {
    state: RootState
  }
>('auth/login', async (data, { rejectWithValue }) => {
  try {
    const { email, password } = data
    const authData = await signInWithEmailAndPassword(auth, email, password)
    const authUser = {
      uid: authData.user.uid,
      email,
    }
    return authUser
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const fetchLogout = createAsyncThunk<
  boolean,
  null,
  {
    state: RootState
  }
>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await signOut(auth)
    return true
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const fetchSignInWithGoogle = createAsyncThunk<
  UserProfileT | null,
  null,
  {
    state: RootState
  }
>('auth/signInWithGoogle', async (_, { rejectWithValue }) => {
  try {
    const { user } = await signInWithGooglePopup()
    if (!user.email) {
      return null
    }
    // Get user profile if it exists
    const docRef = doc(db, 'users', user.uid);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      return {
        ...docSnapshot.data(),
        id: docSnapshot.id,
      } as UserProfileT
    }
    // Create new user profile
    await addDoc(collection(db, 'users'), { ...defaultUserProfile, userId: user.uid, email: user.email })
    return {
      ...defaultUserProfile,
      email: user.email,
      id: user.uid,
    } as UserProfileT
  } catch (err) {
    return rejectWithValue(err)
  }
})
