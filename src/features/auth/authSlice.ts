import { type PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db, signInWithGooglePopup } from "database";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, where, query, getDocs } from "firebase/firestore/lite";
import type { UserProfileT } from "schemas/user";
import { defaultUserProfile } from "schemas/user";
import type { AuthUserT, CurrentUser, FetchStatusT, LoginT, MessageT, SignUpT } from "types";
import type { RootState } from "../store";

interface InitialAuthState {
  currentUser: CurrentUser;
  status: FetchStatusT;
  message: MessageT;
}

const initialState: InitialAuthState = {
  currentUser: null,
  message: null,
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthUserT>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(fetchLogout.fulfilled, (state, _) => {
        state.currentUser = null;
      });
  },
});
export const { setAuth } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;

export const fetchSignUp = createAsyncThunk<
  AuthUserT,
  SignUpT,
  {
    state: RootState;
  }
>("auth/signUp", async (data, { rejectWithValue }) => {
  try {
    const { email, password } = data;
    const authData = await createUserWithEmailAndPassword(auth, email, password);
    const authUser = {
      uid: authData.user.uid,
      email,
    };
    return authUser;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchLogin = createAsyncThunk<
  AuthUserT,
  LoginT,
  {
    state: RootState;
  }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const { email, password } = data;
    const authData = await signInWithEmailAndPassword(auth, email, password);
    const authUser = {
      uid: authData.user.uid,
      email,
    };
    return authUser;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchLogout = createAsyncThunk<
  boolean,
  null,
  {
    state: RootState;
  }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
    return true;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchSignInWithGoogle = createAsyncThunk<
  UserProfileT | null,
  null,
  {
    state: RootState;
  }
>("auth/signInWithGoogle", async (_, { rejectWithValue }) => {
  try {
    const { user } = await signInWithGooglePopup();
    if (!user.email) {
      return null;
    }

	const fbq = query(collection(db, "users"), where("userId", "==", user.uid));
    const { docs } = await getDocs(fbq);
    const profile = docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        userId: data.userId,
        id: doc.id,
      };
    });

	if (profile.length === 1) {
		return profile[0] as UserProfileT;
	}
    // Create new user profile
    await addDoc(collection(db, "users"), {
      ...defaultUserProfile,
      userId: user.uid,
      email: user.email,
    });

	return {
      ...defaultUserProfile,
      email: user.email,
      id: user.uid,
    } as UserProfileT;
  } catch (err) {
    return rejectWithValue(err);
  }
});
