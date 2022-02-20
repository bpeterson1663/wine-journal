import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FetchStatusT, MessageT, WineT } from '../../types'
import { RootState, AppThunk } from '../store'
import { getWines, addWineEntry, getWineById, deleteWineEntry } from '../../api'

interface InitialWineState {
  message: MessageT
  status: FetchStatusT
  wineList: WineT[]
  viewWine: WineT | null
}
const initialState: InitialWineState = {
  message: null,
  status: 'idle',
  wineList: [],
  viewWine: null,
}

export const wineSlice = createSlice({
  name: 'wine',
  initialState,
  reducers: {
    wineFetchStart: (state) => {
      state.status = 'loading'
    },
    wineListFetchSuccess: (state, action: PayloadAction<WineT[]>) => {
      state.status = 'success'
      state.wineList = action.payload
      state.message = null
    },
    wineFetchFailure: (state, action: PayloadAction<MessageT>) => {
      state.status = 'error'
      state.message = action.payload
    },
    wineCreateFetchSuccess: (state, action: PayloadAction<{ wine: WineT; message: string }>) => {
      state.status = 'success'
      state.message = action.payload.message
      state.wineList = [...state.wineList, action.payload.wine]
    },
    wineFetchSuccess: (state, action: PayloadAction<WineT>) => {
      state.status = 'success'
      state.viewWine = action.payload
    },
    wineDeleteSuccess: (state, action: PayloadAction<string>) => {
      state.status = 'success'
      state.wineList = state.wineList.filter((wine) => wine.id !== action.payload)
    },
  },
})

export const {
  wineFetchStart,
  wineListFetchSuccess,
  wineFetchFailure,
  wineCreateFetchSuccess,
  wineFetchSuccess,
  wineDeleteSuccess,
} = wineSlice.actions

export const fetchWineListStart =
  (userId: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(wineFetchStart())
      const response = await getWines(userId)
      const { success, data, message } = response
      if (success && data) {
        dispatch(wineListFetchSuccess(data))
      } else {
        dispatch(wineFetchFailure(message))
      }
    } catch (err) {
      dispatch(wineFetchFailure(`error ${err}`))
    }
  }

export const fetchWineStart =
  (id: string | undefined): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(wineFetchStart())
      if (!id) {
        dispatch(wineFetchFailure('id does not exist'))
      } else {
        const response = await getWineById(id)
        const { data, success, message } = response
        if (success && data) {
          dispatch(wineFetchSuccess(data as WineT))
        } else {
          dispatch(wineFetchFailure(message))
        }
      }
    } catch (err) {
      dispatch(wineFetchFailure(`error ${err}`))
    }
  }

export const fetchWineCreateStart =
  (payload: WineT): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(wineFetchStart())
      const response = await addWineEntry(payload)
      const { success, message } = response
      if (success) {
        dispatch(wineCreateFetchSuccess({ wine: payload, message }))
      } else {
        dispatch(wineFetchFailure(message))
      }
    } catch (err) {
      dispatch(wineFetchFailure(`error ${err}`))
    }
  }

export const fetchWineDeleteStart =
  (payload: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(wineFetchStart())
      const response = await deleteWineEntry(payload)
      const { success, message } = response
      if (success) {
        dispatch(wineDeleteSuccess(payload))
      } else {
        dispatch(wineFetchFailure(message))
      }
    } catch (err) {
      dispatch(wineFetchFailure(`error ${err}`))
    }
  }
export const wineListSelector = (state: RootState) => state.wine

export default wineSlice.reducer
