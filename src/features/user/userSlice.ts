import {
  type GetUserByIdVariables,
  type Plan_Key,
  type UpdateUserProfileVariables,
  createUserProfile,
  getUserById,
  updateUserProfile,
} from "@firebasegen/somm-scribe-connector";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dc } from "database";
import { type UserProfileT, defaultUserProfile } from "schemas/user";
import type { FetchStatusT, MessageT } from "types";
import type { RootState } from "../store";

interface InitialUserState {
  userProfile: UserProfileT;
  status: FetchStatusT;
  message: MessageT;
}

const initialState: InitialUserState = {
  userProfile: defaultUserProfile,
  status: "idle",
  message: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
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

export const createUser = createAsyncThunk<
  UserProfileT,
  UserProfileT,
  {
    state: RootState;
  }
>("user/createUser", async (request, { rejectWithValue }) => {
  try {
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

    const { data } = await createUserProfile(dc, profile);

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
  UserProfileT,
  string,
  {
    state: RootState;
  }
>("user/getUserProfileById", async (userId, { rejectWithValue }) => {
  try {
    const params: GetUserByIdVariables = { userId };
    const { data } = await getUserById(params);

    if (data.users.length === 1) {
      const profile = data.users[0];
      return {
        id: profile.id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        avatar: profile.avatar,
        displayName: profile.displayName,
        userId: profile.userId,
        email: profile.email,
        planId: profile.plan.id,
        trialExpires: new Date(profile.trialExpires),
        isPaid: profile.isPaid,
      } as UserProfileT;
    }

    return defaultUserProfile;
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
  try {
    const planId = data.planId as unknown;
    const { id, firstName, lastName, avatar, displayName, userId, email, trialExpires, isPaid } = data;
    const request: UpdateUserProfileVariables = {
      firstName,
      lastName,
      id,
      avatar,
      displayName,
      userId,
      email,
      isPaid,
      trialExpires: trialExpires.toISOString(),
      plan: planId as Plan_Key,
    };

    await updateUserProfile(request);
    return data;
  } catch (err) {
    console.log({ err });
    return rejectWithValue(err);
  }
});
