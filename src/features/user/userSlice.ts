import { type GetUserByIdVariables, type Plan_Key, createUser, getUserById } from "@firebasegen/somm-scribe-connector";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db, dc } from "database";
import { doc, updateDoc } from "firebase/firestore/lite";
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
>("user/createUserProfile", async (request, { rejectWithValue }) => {
  try {
    // const docData = await addDoc(collection(db, "users"), {
    //   ...request,
    // });
    const plan = request.planId as unknown;
    const profile = {
      firstName: request.firstName,
      lastName: request.lastName,
      plan: plan as Plan_Key,
      email: request.email,
      displayName: request.displayName,
      avatar: request.avatar,
      trialExpires: request.trialExpires.toISOString(),
      isPaid: true,
      userId: request.userId,
    };

    const { data } = await createUser(dc, profile);

    const userProfile = {
      ...request,
      id: data.user_insert.id,
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
>("user/getUserProfileById", async (userId, { rejectWithValue }) => {
  try {
    const params: GetUserByIdVariables = { userId };
    const { data } = await getUserById(params);

    if (data.users.length === 1) {
      const profile = data.users[0] as unknown;
      return profile as UserProfileT;
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
