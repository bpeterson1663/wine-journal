import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "database";
import type { RootState } from "features/store";
import { type QuerySnapshot, collection, getDocs } from "firebase/firestore/lite";
import type { PlanT } from "schemas/plans";
import type { FetchStatusT, MessageT } from "types";

export interface InitialPlanState {
  message: MessageT;
  status: FetchStatusT;
  planList: PlanT[];
  plan: PlanT;
}

const initialState: InitialPlanState = {
  message: null,
  status: "idle",
  planList: [],
  plan: {} as PlanT,
};

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPlans.fulfilled, (state, action) => {
      const planList = action.payload.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        } as PlanT;
      });

      state.planList = planList;
    });
  },
});

export default planSlice.reducer;

export const fetchPlans = createAsyncThunk<
  QuerySnapshot,
  void,
  {
    state: RootState;
  }
>("plans/fetchPlans", async (_, { rejectWithValue }) => {
  try {
    return await getDocs(collection(db, "plans"));
  } catch (err) {
    return rejectWithValue(err);
  }
});
