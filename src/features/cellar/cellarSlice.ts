import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addWineEntry, deleteWineEntry, getWineById, getWines, updateWineEntry } from 'api'
import { FetchStatusT, MessageT, WineT } from 'types'
import { AppThunk, RootState } from 'features/store'

export interface InitialCellarState {
  message: MessageT
  status: FetchStatusT
  wineList: WineT[]
  editWine: WineT | null
}
const initialState: InitialCellarState = {
  message: null,
  status: 'idle',
  wineList: [],
  editWine: null
}

const prepData = (data: WineT): WineT => {
  const quantity = typeof data.quantity === 'string' ? parseInt(data.quantity) : data.quantity
  const price = typeof data.price === 'string' ? parseFloat(data.price) : data.price
  return {
    ...data,
    quantity,
    price
  }
}

export const cellarSlice = createSlice({
  name: 'cellar',
  initialState,
  reducers: {
    cellarStartFetch: state => {
      state.status = 'loading'
    },
    cellarFetchSuccess: (state, action: PayloadAction<WineT[]>) => {
      state.status = 'success'
      state.wineList = action.payload
      state.message = null
    },
    cellarFetchFailure: (state, action: PayloadAction<MessageT>) => {
      state.status = 'error'
      state.message = action.payload
    },
    wineCreateFetchSuccess: (state, action: PayloadAction<{ wine: WineT, message: string }>) => {
      state.status = 'success'
      state.message = action.payload.message
      state.wineList = [...state.wineList, action.payload.wine]
    },
    wineEditFetchSuccess: (state, action: PayloadAction<{ wine: WineT, message: string }>) => {
      state.status = 'success'
      state.message = action.payload.message
      const index = state.wineList.findIndex(el => el.id === action.payload.wine.id)
      if (index >= 0) {
        state.wineList[index] = action.payload.wine
      }
    },
    wineFetchSuccess: (state, action: PayloadAction<WineT>) => {
      state.status = 'success'
      state.editWine = action.payload
    },
    wineDeleteSuccess: (state, action: PayloadAction<string>) => {
      state.status = 'success'
      state.message = 'Wine Deleted Successfully'
      state.wineList = state.wineList.filter(wine => wine.id !== action.payload)
    },
    wineSetEdit: (state, action: PayloadAction<WineT>) => {
      state.editWine = action.payload
    }
  }
})

export const {
  cellarStartFetch,
  cellarFetchSuccess,
  cellarFetchFailure,
  wineCreateFetchSuccess,
  wineEditFetchSuccess,
  wineFetchSuccess,
  wineDeleteSuccess,
  wineSetEdit
} = cellarSlice.actions

export const fetchWineListStart =
  (userId: string): AppThunk =>
    async dispatch => {
      try {
        dispatch(cellarStartFetch())
        const response = await getWines(userId)
        const { success, data, message } = response
        if (success && data !== undefined) {
          dispatch(cellarFetchSuccess(data))
        } else {
          dispatch(cellarFetchFailure(message))
        }
      } catch (err) {
        console.error(err)
        dispatch(cellarFetchFailure('error fetching wines'))
      }
    }

export const fetchWineStart =
  (id: string): AppThunk =>
    async dispatch => {
      try {
        dispatch(cellarStartFetch())
        if (!id) {
          dispatch(cellarFetchFailure('id does not exist'))
        } else {
          const response = await getWineById(id)
          const { data, success, message } = response
          if (success && data) {
            dispatch(wineFetchSuccess(data as WineT))
          } else {
            dispatch(cellarFetchFailure(message))
          }
        }
      } catch (err) {
        console.error(err)
        dispatch(cellarFetchFailure('error fetching wines'))
      }
    }

export const fetchWineCreateStart =
  (payload: WineT): AppThunk =>
    async dispatch => {
      try {
        dispatch(cellarStartFetch())
        const preppedData = prepData(payload)
        const { data, success, message } = await addWineEntry(preppedData)
        if (success) {
          dispatch(wineCreateFetchSuccess({ wine: { ...preppedData, id: data?.id }, message }))
        } else {
          dispatch(cellarFetchFailure(message))
        }
      } catch (err) {
        console.error(err)
        dispatch(cellarFetchFailure('error creating wine'))
      }
    }

export const fetchWineEditStart =
  (payload: WineT): AppThunk =>
    async dispatch => {
      try {
        dispatch(cellarStartFetch())
        const preppedData = prepData(payload)
        const { success, message, data } = await updateWineEntry(preppedData)

        if (success) {
          dispatch(wineEditFetchSuccess({ wine: { ...preppedData, id: data?.id }, message }))
        } else {
          dispatch(cellarFetchFailure(message))
        }
      } catch (err) {
        console.error(err)
        dispatch(cellarFetchFailure('error editing wine'))
      }
    }

export const fetchWineDeleteStart =
  (payload: string): AppThunk =>
    async dispatch => {
      try {
        dispatch(cellarStartFetch())
        const response = await deleteWineEntry(payload)
        const { success, message } = response
        if (success) {
          dispatch(wineDeleteSuccess(payload))
        } else {
          dispatch(cellarFetchFailure(message))
        }
      } catch (err) {
        console.error(err)
        dispatch(cellarFetchFailure('error deleting wine'))
      }
    }

export const wineListSelector = (state: RootState) => state.cellar

export default cellarSlice.reducer
