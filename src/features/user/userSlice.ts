import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "database";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore/lite";
import type { UserProfileT } from "schemas/user";
import type { FetchStatusT, MessageT } from "types";
import type { RootState } from "../store";

interface InitialUserState {
  userProfile: UserProfileT | null;
  status: FetchStatusT;
  message: MessageT;
}

const initialState: InitialUserState = {
  userProfile: null,
  status: "idle",
  message: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(getUserProfileById.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      });
  },
});

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;

export const createUserProfile = createAsyncThunk<
  UserProfileT,
  UserProfileT,
  {
    state: RootState;
  }
>("user/createUserProfile", async (data, { rejectWithValue }) => {
  try {
    const { firstName, lastName, userId } = data;
    const docData = await addDoc(collection(db, "users"), {
      firstName,
      lastName,
      userId,
    });
    const userProfile = {
      ...data,
      id: docData.id,
    };
    return userProfile as UserProfileT;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const getUserProfileById = createAsyncThunk<
  UserProfileT | null,
  string,
  {
    state: RootState;
  }
>("user/getUserProfileById", async (id, { rejectWithValue }) => {
  try {
    const fbq = query(collection(db, "users"), where("userId", "==", id));
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

    return null;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const editUserProfile = createAsyncThunk<
  UserProfileT,
  UserProfileT,
  {
    state: RootState;
  }
>("user/editUserProfile", async (data, { rejectWithValue }) => {
  const userRef = doc(db, "users", data.id);
  try {
    delete data.imageBlob;
    await updateDoc(userRef, { ...data });
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});
