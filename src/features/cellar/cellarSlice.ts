import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { FetchStatusT, MessageT } from 'types'
import { RootState } from 'features/store'
import { WineT } from 'schemas/cellar'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  QuerySnapshot,
  DocumentSnapshot,
} from 'firebase/firestore/lite'
import { db } from '../../firebase'

export interface InitialCellarState {
  message: MessageT
  status: FetchStatusT
  wineList: WineT[]
  wine: WineT | null
}
const initialState: InitialCellarState = {
  message: null,
  status: 'idle',
  wineList: [],
  wine: null,
}

export const cellarSlice = createSlice({
  name: 'cellar',
  initialState,
  reducers: {
    wineSetEdit: (state, action: PayloadAction<WineT>) => {
      state.wine = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWines.fulfilled, (state, action) => {
        const wineList = action.payload.docs.map((doc) => {
          const data = doc.data()
          const quantity = typeof data.quantity === 'string' ? parseInt(data.quantity) : data.quantity
          const price = typeof data.price === 'string' ? parseFloat(data.price) : data.price

          return {
            ...data,
            id: doc.id,
            date: data.date.toDate(),
            quantity,
            price,
          }
        })

        const data = wineList.map((wine) => wine as WineT)

        state.wineList = data
      })
      .addCase(fetchWineById.fulfilled, (state, action) => {
        const docSnap = action.payload
        if (docSnap.exists()) {
          const data = docSnap.data()
          const quantity = typeof data.quantity === 'string' ? parseInt(data.quantity) : data.quantity
          const price = typeof data.price === 'string' ? parseFloat(data.price) : data.price

          const wine = {
            ...data,
            id: docSnap.id,
            date: data.date.toDate(),
            quantity,
            price,
          }
          state.wine = wine as WineT
        } else {
          state.wine = null
        }
      })
      .addCase(createWine.fulfilled, (state, action) => {
        const wines = [...state.wineList, action.payload]
        state.wineList = wines
      })
      .addCase(editWine.fulfilled, (state, action) => {
        const index = state.wineList.findIndex((el) => el.id === action.payload.id)
        if (index >= 0) {
          state.wineList[index] = action.payload
        }
      })
      .addCase(deleteWine.fulfilled, (state, action) => {
        state.wineList = state.wineList.filter((wine) => wine.id !== action.payload)
      })
  },
})

export const { wineSetEdit } = cellarSlice.actions

export const wineListSelector = (state: RootState) => state.cellar

export default cellarSlice.reducer

export const fetchWines = createAsyncThunk<
  QuerySnapshot,
  string,
  {
    state: RootState
  }
>('wine/fetchWines', async (userId, { rejectWithValue }) => {
  try {
    const fbq = query(collection(db, 'wines'), where('userId', '==', userId))
    return await getDocs(fbq)
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const fetchWineById = createAsyncThunk<
  DocumentSnapshot,
  string,
  {
    state: RootState
  }
>('wine/fetchWineById', async (id, { rejectWithValue }) => {
  try {
    const docRef = doc(db, 'wines', id)
    return await getDoc(docRef)
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const createWine = createAsyncThunk<
  WineT,
  WineT,
  {
    state: RootState
  }
>('wine/createWine', async (data, { rejectWithValue }) => {
  const quantity = typeof data.quantity === 'string' ? parseInt(data.quantity) : data.quantity
  const price = typeof data.price === 'string' ? parseFloat(data.price) : data.price
  try {
    const docData = await addDoc(collection(db, 'wines'), { ...data, quantity, price })
    const wine = {
      ...data,
      id: docData.id,
    }
    return wine as WineT
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const editWine = createAsyncThunk<
  WineT,
  WineT,
  {
    state: RootState
  }
>('wine/editWine', async (data, { rejectWithValue }) => {
  const wineRef = doc(db, 'wines', data.id)
  const quantity = typeof data.quantity === 'string' ? parseInt(data.quantity) : data.quantity
  const price = typeof data.price === 'string' ? parseFloat(data.price) : data.price

  try {
    await updateDoc(wineRef, { ...data, quantity, price })
    return data
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const deleteWine = createAsyncThunk<
  string,
  string,
  {
    state: RootState
  }
>('wine/deleteWine', async (id, { rejectWithValue }) => {
  try {
    await deleteDoc(doc(db, 'wines', id))
    return id
  } catch (err) {
    return rejectWithValue(err)
  }
})
