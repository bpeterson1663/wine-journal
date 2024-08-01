import {
  type GetAccountByIdVariables,
  type Plan_Key,
  type UpdateAccountVariables,
  createAccount,
  getAccountById,
  updateAccount,
} from "@firebasegen/somm-scribe-connector";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dc } from "database";
import { type AccountT, defaultAccount } from "schemas/account";
import type { FetchStatusT, MessageT } from "types";
import type { RootState } from "../store";

interface InitialUserState {
  account: AccountT;
  status: FetchStatusT;
  message: MessageT;
}

const initialState: InitialUserState = {
  account: defaultAccount,
  status: "idle",
  message: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createAccountThunk.fulfilled, (state, action) => {
        state.account = action.payload;
      })
      .addCase(getAccountByIdThunk.fulfilled, (state, action) => {
        state.account = action.payload;
      })
      .addCase(editAccountThunk.fulfilled, (state, action) => {
        state.account = action.payload;
      });
  },
});

export const accountSelector = (state: RootState) => state.account;

export default accountSlice.reducer;

export const createAccountThunk = createAsyncThunk<
  AccountT,
  AccountT,
  {
    state: RootState;
  }
>("account/createAccount", async (request, { rejectWithValue }) => {
  try {
    const plan = request.planId as unknown;
    const account = {
      firstName: request.firstName,
      lastName: request.lastName,
      plan: plan as Plan_Key,
      email: request.email,
      displayName: request.displayName,
      avatar: request.avatar,
      trialExpires: request.trialExpires.toISOString(),
      isPaid: true,
      authId: request.authId,
    };

    const { data } = await createAccount(dc, account);

    const response = {
      ...request,
      id: data.account_insert.id,
    };

    return response as AccountT;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const getAccountByIdThunk = createAsyncThunk<
  AccountT,
  string,
  {
    state: RootState;
  }
>("account/getAccountById", async (authId, { rejectWithValue }) => {
  try {
    const params: GetAccountByIdVariables = { authId };
    const { data } = await getAccountById(params);

    if (data.accounts.length === 1) {
      const account = data.accounts[0];
      return {
        id: account.id,
        firstName: account.firstName,
        lastName: account.lastName,
        avatar: account.avatar,
        displayName: account.displayName,
        authId: account.authId,
        email: account.email,
        planId: account.plan.id,
        trialExpires: new Date(account.trialExpires),
        isPaid: account.isPaid,
      } as AccountT;
    }

    return defaultAccount;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const editAccountThunk = createAsyncThunk<
  AccountT,
  AccountT,
  {
    state: RootState;
  }
>("account/editAccount", async (data, { rejectWithValue }) => {
  try {
    const planId = data.planId as unknown;
    const { id, firstName, lastName, avatar, displayName, authId, email, trialExpires, isPaid } = data;
    const request: UpdateAccountVariables = {
      firstName,
      lastName,
      id,
      avatar,
      displayName,
      authId,
      email,
      isPaid,
      trialExpires: trialExpires.toISOString(),
      plan: planId as Plan_Key,
    };

    await updateAccount(request);
    return data;
  } catch (err) {
    console.error({ err });
    return rejectWithValue(err);
  }
});
