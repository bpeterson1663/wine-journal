import { type PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db, dc } from "database";
import dayjs from "dayjs";
import {
  type DocumentSnapshot,
  type QuerySnapshot,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import type { WineT } from "schemas/cellar";
import type { TastingT } from "schemas/tastings";
import type { FetchStatusT, MessageT } from "types";
import type { RootState } from "../store";

import {
  type ListTastingsResponse,
  type ListTastingsVariables,
  type User_Key,
  createTasting,
  listTastings,
} from "@firebasegen/somm-scribe-connector";
interface InitialTastingState {
  message: MessageT;
  status: FetchStatusT;
  tastingList: TastingT[];
  tasting: TastingT | null;
  tastingOpen: WineT | null;
  publicTastingList: TastingT[];
}
const initialState: InitialTastingState = {
  message: null,
  status: "idle",
  tastingList: [],
  tasting: null,
  tastingOpen: null,
  publicTastingList: [],
};

export const tastingSlice = createSlice({
  name: "tasting",
  initialState,
  reducers: {
    tastingSetEdit: (state, action: PayloadAction<TastingT>) => {
      state.tasting = action.payload;
    },
    tastingSetOpen: (state, action: PayloadAction<WineT | null>) => {
      state.tastingOpen = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTastings.fulfilled, (state, action) => {
        const tastingList = action.payload.tastings.map((tasting) => {
          const quantity = typeof tasting.quantity === "string" ? Number.parseInt(tasting.quantity) : tasting.quantity;
          const price = typeof tasting.price === "string" ? Number.parseFloat(tasting.price) : tasting.price;

          const data = {
            ...tasting,
            quantity,
            price,
            type: "tasting",
          } as unknown;

          return data as TastingT;
        });

        // const data = tastingList.map((tasting) => tasting as TastingT);
        // const ids = [...state.tastingList, ...data].map((tasting) => tasting.id);
        // const filter = [...state.tastingList, ...data].filter(
        //   (value: TastingT, index) => !ids.includes(value.id, index + 1),
        // );

        state.tastingList = tastingList;
      })
      .addCase(fetchPublicTastings.fulfilled, (state, action) => {
        const tastingList = action.payload.docs.map((doc) => {
          const data = doc.data();
          const quantity = typeof data.quantity === "string" ? Number.parseInt(data.quantity) : data.quantity;
          const price = typeof data.price === "string" ? Number.parseFloat(data.price) : data.price;

          return {
            ...data,
            id: doc.id,
            date: data.date.toDate(),
            quantity,
            price,
            type: "tasting",
          };
        });

        state.publicTastingList = tastingList.map((tasting) => tasting as TastingT);
      })
      .addCase(fetchTastingById.fulfilled, (state, action) => {
        const docSnap = action.payload;
        if (docSnap.exists()) {
          const data = docSnap.data();
          const quantity = typeof data.quantity === "string" ? Number.parseInt(data.quantity) : data.quantity;
          const price = typeof data.price === "string" ? Number.parseFloat(data.price) : data.price;

          const tasting = {
            ...data,
            id: docSnap.id,
            date: data.date.toDate(),
            quantity,
            price,
          };
          state.tasting = tasting as TastingT;
        } else {
          state.tasting = null;
        }
      })
      .addCase(createTastingThunk.fulfilled, (state, action) => {
        const tastings = [...state.tastingList, action.payload];
        state.tastingList = tastings;
      })
      .addCase(editTasting.fulfilled, (state, action) => {
        const index = state.tastingList.findIndex((el) => el.id === action.payload.id);
        if (index >= 0) {
          state.tastingList[index] = action.payload;
        }
      })
      .addCase(deleteTasting.fulfilled, (state, action) => {
        state.tastingList = state.tastingList.filter((tasting) => tasting.id !== action.payload);
      });
  },
});

export const { tastingSetEdit, tastingSetOpen } = tastingSlice.actions;

export const tastingListSelector = (state: RootState) => state.tasting;

export default tastingSlice.reducer;

interface FetchTastingsParams {
  userId: string;
  previousDoc?: string;
}
export const fetchTastings = createAsyncThunk<
  ListTastingsResponse,
  FetchTastingsParams,
  {
    state: RootState;
  }
>("tasting/fetchTastings", async ({ userId }, { rejectWithValue }) => {
  try {
    const params: ListTastingsVariables = { userId };
    const { data } = await listTastings(params);

    return data;
    // const baseQuery = query(collection(db, "tastings"), where("userId", "==", userId), orderBy("date", "desc"));
    // if (previousDoc) {
    //   const docRef = doc(db, "tastings", previousDoc);
    //   const docSnapshot = await getDoc(docRef);
    //   const fbq = query(baseQuery, startAfter(docSnapshot), limit(10));
    //   return await getDocs(fbq);
    // }

    // const fbq = query(baseQuery, limit(10));
    // return await getDocs(fbq);
  } catch (err) {
    console.error(err);
    return rejectWithValue(err);
  }
});

export const fetchPublicTastings = createAsyncThunk<QuerySnapshot>(
  "tasting/fetchPublicTastings",
  async (_, { rejectWithValue }) => {
    try {
      const sevenDaysAgo = dayjs().subtract(7, "day").toDate();

      const fbq = query(
        collection(db, "tastings"),
        where("date", ">", sevenDaysAgo),
        where("isPublic", "==", true),
        orderBy("date", "desc"),
        limit(10),
      );
      return await getDocs(fbq);
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  },
);

export const fetchTastingById = createAsyncThunk<
  DocumentSnapshot,
  string,
  {
    state: RootState;
  }
>("tasting/fetchTastingById", async (id, { rejectWithValue }) => {
  try {
    const docRef = doc(db, "tastings", id);
    return await getDoc(docRef);
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const createTastingThunk = createAsyncThunk<
  TastingT,
  TastingT,
  {
    state: RootState;
  }
>("tasting/createTasting", async (request, { rejectWithValue }) => {
  const quantity = typeof request.quantity === "string" ? Number.parseInt(request.quantity) : request.quantity;
  const price = typeof request.price === "string" ? Number.parseFloat(request.price) : request.price;
  try {
    const userId = request.userId as unknown;
    const {
      classification,
      country,
      date,
      description,
      labelUri,
      producer,
      region,
      subregion,
      varietal,
      vintage,
      hue,
      color,
      intensity,
      smell,
      alcohol,
      acidity,
      tannin,
      sweet,
      body,
      rating,
      remarks,
    } = request;
    const tastingData = {
      user: userId as User_Key,
      classification,
      country,
      date: date.toISOString(),
      description,
      labelUri,
      producer,
      price,
      region,
      subregion,
      varietal,
      vintage,
      quantity,
      hue,
      color,
      intensity,
      smell,
      alcohol,
      acidity,
      tannin,
      sweet,
      body,
      rating,
      remarks,
    };
    const { data } = await createTasting(dc, { ...tastingData });

    const tasting = {
      ...request,
      id: data.tasting_insert.id,
    };
    return tasting as TastingT;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const editTasting = createAsyncThunk<
  TastingT,
  TastingT,
  {
    state: RootState;
  }
>("tasting/editTasting", async (data, { rejectWithValue }) => {
  const tastingRef = doc(db, "tastings", data.id);
  const quantity = typeof data.quantity === "string" ? Number.parseInt(data.quantity) : data.quantity;
  const price = typeof data.price === "string" ? Number.parseFloat(data.price) : data.price;

  try {
    delete data.imageBlob;
    await updateDoc(tastingRef, { ...data, quantity, price });
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const deleteTasting = createAsyncThunk<
  string,
  string,
  {
    state: RootState;
  }
>("tasting/deleteTasting", async (id, { rejectWithValue }) => {
  try {
    await deleteDoc(doc(db, "tastings", id));
    return id;
  } catch (err) {
    return rejectWithValue(err);
  }
});
