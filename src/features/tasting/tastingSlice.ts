import {
	type PayloadAction,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import dayjs from "dayjs";
import {
	type DocumentSnapshot,
	type QuerySnapshot,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
	updateDoc,
	where,
} from "firebase/firestore/lite";
import type { WineT } from "schemas/cellar";
import type { TastingT } from "schemas/tastings";
import type { FetchStatusT, MessageT } from "types";
import { db } from "database";
import type { RootState } from "../store";

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
				const tastingList = action.payload.docs.map((doc) => {
					const data = doc.data();
					const quantity =
						typeof data.quantity === "string"
							? Number.parseInt(data.quantity)
							: data.quantity;
					const price =
						typeof data.price === "string"
							? Number.parseFloat(data.price)
							: data.price;

					return {
						...data,
						id: doc.id,
						date: data.date.toDate(),
						quantity,
						price,
					};
				});

				const data = tastingList.map((tasting) => tasting as TastingT);
				const ids = [...state.tastingList, ...data].map(
					(tasting) => tasting.id,
				);

				state.tastingList = [...state.tastingList, ...data].filter(
					(value: TastingT, index) => !ids.includes(value.id, index + 1),
				);
			})
			.addCase(fetchPublicTastings.fulfilled, (state, action) => {
				const tastingList = action.payload.docs.map((doc) => {
					const data = doc.data();
					const quantity =
						typeof data.quantity === "string"
							? Number.parseInt(data.quantity)
							: data.quantity;
					const price =
						typeof data.price === "string"
							? Number.parseFloat(data.price)
							: data.price;

					return {
						...data,
						id: doc.id,
						date: data.date.toDate(),
						quantity,
						price,
					};
				});

				state.publicTastingList = tastingList.map(
					(tasting) => tasting as TastingT,
				);
			})
			.addCase(fetchTastingById.fulfilled, (state, action) => {
				const docSnap = action.payload;
				if (docSnap.exists()) {
					const data = docSnap.data();
					const quantity =
						typeof data.quantity === "string"
							? Number.parseInt(data.quantity)
							: data.quantity;
					const price =
						typeof data.price === "string"
							? Number.parseFloat(data.price)
							: data.price;

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
			.addCase(createTasting.fulfilled, (state, action) => {
				const tastings = [...state.tastingList, action.payload];
				state.tastingList = tastings;
			})
			.addCase(editTasting.fulfilled, (state, action) => {
				const index = state.tastingList.findIndex(
					(el) => el.id === action.payload.id,
				);
				if (index >= 0) {
					state.tastingList[index] = action.payload;
				}
			})
			.addCase(deleteTasting.fulfilled, (state, action) => {
				state.tastingList = state.tastingList.filter(
					(tasting) => tasting.id !== action.payload,
				);
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
	QuerySnapshot,
	FetchTastingsParams,
	{
		state: RootState;
	}
>(
	"tasting/fetchTastings",
	async ({ userId, previousDoc }, { rejectWithValue }) => {
		try {
			const baseQuery = query(
				collection(db, "tastings"),
				where("userId", "==", userId),
				orderBy("date", "desc"),
			);
			if (previousDoc) {
				const docRef = doc(db, "tastings", previousDoc);
				const docSnapshot = await getDoc(docRef);
				const fbq = query(baseQuery, startAfter(docSnapshot), limit(10));
				return await getDocs(fbq);
			}

			const fbq = query(baseQuery, limit(10));
			return await getDocs(fbq);
		} catch (err) {
			console.error(err);
			return rejectWithValue(err);
		}
	},
);

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

export const createTasting = createAsyncThunk<
	TastingT,
	TastingT,
	{
		state: RootState;
	}
>("tasting/createTasting", async (data, { rejectWithValue }) => {
	const quantity =
		typeof data.quantity === "string"
			? Number.parseInt(data.quantity)
			: data.quantity;
	const price =
		typeof data.price === "string" ? Number.parseFloat(data.price) : data.price;
	try {
		delete data.imageBlob
		const docData = await addDoc(collection(db, "tastings"), {
			...data,
			quantity,
			price,
		});
		const tasting = {
			...data,
			id: docData.id,
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
	const quantity =
		typeof data.quantity === "string"
			? Number.parseInt(data.quantity)
			: data.quantity;
	const price =
		typeof data.price === "string" ? Number.parseFloat(data.price) : data.price;

	try {
		delete data.imageBlob
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
