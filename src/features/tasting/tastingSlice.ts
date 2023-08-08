import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addTastingEntry, deleteTastingEntry, getTastingById, getTastings, updateTastingEntry } from '../../api'
import { FetchStatusT, MessageT, TastingT, WineT } from '../../types'
import { AppThunk, RootState } from '../store'

interface InitialTastingState {
  message: MessageT
  status: FetchStatusT
  tastingList: TastingT[]
  editTasting: TastingT | null
  tastingOpen: WineT | null
}
const initialState: InitialTastingState = {
  message: null,
  status: 'idle',
  tastingList: [],
  editTasting: null,
  tastingOpen: null
}

export const tastingSlice = createSlice({
  name: 'tasting',
  initialState,
  reducers: {
    tastingFetchStart: state => {
      state.status = 'loading'
    },
    tastingListFetchSuccess: (state, action: PayloadAction<TastingT[]>) => {
      state.status = 'success'
      state.tastingList = action.payload
      state.message = null
    },
    tastingFetchFailure: (state, action: PayloadAction<MessageT>) => {
      state.status = 'error'
      state.message = action.payload
    },
    tastingCreateFetchSuccess: (state, action: PayloadAction<{ tasting: TastingT, message: string }>) => {
      state.status = 'success'
      state.message = action.payload.message
      state.tastingList = [...state.tastingList, action.payload.tasting]
    },
    tastingEditFetchSuccess: (state, action: PayloadAction<{ tasting: TastingT, message: string }>) => {
      state.status = 'success'
      state.message = action.payload.message
      const index = state.tastingList.findIndex(el => el.id === action.payload.tasting.id)
      if (index >= 0) {
        state.tastingList[index] = action.payload.tasting
      }
    },
    tastingFetchSuccess: (state, action: PayloadAction<TastingT>) => {
      state.status = 'success'
      state.editTasting = action.payload
    },
    tastingDeleteSuccess: (state, action: PayloadAction<string>) => {
      state.status = 'success'
      state.message = 'Tasting Deleted Successfully'
      state.tastingList = state.tastingList.filter(tasting => tasting.id !== action.payload)
    },
    tastingSetEdit: (state, action: PayloadAction<TastingT>) => {
      state.editTasting = action.payload
    },
    tastingSetOpen: (state, action: PayloadAction<WineT | null>) => {
      state.tastingOpen = action.payload
    }
  }
})

export const {
  tastingFetchStart,
  tastingListFetchSuccess,
  tastingFetchFailure,
  tastingCreateFetchSuccess,
  tastingEditFetchSuccess,
  tastingFetchSuccess,
  tastingDeleteSuccess,
  tastingSetEdit,
  tastingSetOpen
} = tastingSlice.actions

export const fetchTastingListStart =
  (userId: string): AppThunk =>
    async dispatch => {
      try {
        dispatch(tastingFetchStart())
        const response = await getTastings(userId)
        const { success, data, message } = response
        if (success && data) {
          dispatch(tastingListFetchSuccess(data))
        } else {
          dispatch(tastingFetchFailure(message))
        }
      } catch (err) {
        console.error(err)
        dispatch(tastingFetchFailure('error fetching tastings'))
      }
    }

export const fetchTastingStart =
  (id: string): AppThunk =>
    async dispatch => {
      try {
        dispatch(tastingFetchStart())
        if (!id) {
          dispatch(tastingFetchFailure('id does not exist'))
        } else {
          const response = await getTastingById(id)
          const { data, success, message } = response
          if (success && data) {
            dispatch(tastingFetchSuccess(data as TastingT))
          } else {
            dispatch(tastingFetchFailure(message))
          }
        }
      } catch (err) {
        console.error(err)
        dispatch(tastingFetchFailure('error occurred'))
      }
    }

export const fetchTastingCreateStart =
  (payload: TastingT): AppThunk =>
    async dispatch => {
      try {
        dispatch(tastingFetchStart())
        const response = await addTastingEntry(payload)
        const { success, message } = response
        if (success) {
          dispatch(tastingCreateFetchSuccess({ tasting: payload, message }))
        } else {
          dispatch(tastingFetchFailure(message))
        }
      } catch (err) {
        console.error(err)
        dispatch(tastingFetchFailure('error occurred'))
      }
    }

export const fetchTastingEditStart =
  (payload: TastingT): AppThunk =>
    async dispatch => {
      try {
        dispatch(tastingFetchStart())
        const response = await updateTastingEntry(payload)
        const { success, message } = response
        if (success) {
          dispatch(tastingEditFetchSuccess({ message, tasting: payload }))
        } else {
          dispatch(tastingFetchFailure(message))
        }
      } catch (err) {
        console.error(err)
        dispatch(tastingFetchFailure('error occurred'))
      }
    }

export const fetchTastingDeleteStart =
  (payload: string): AppThunk =>
    async dispatch => {
      try {
        dispatch(tastingFetchStart())
        const response = await deleteTastingEntry(payload)
        const { success, message } = response
        if (success) {
          dispatch(tastingDeleteSuccess(payload))
        } else {
          dispatch(tastingFetchFailure(message))
        }
      } catch (err) {
        console.error(err)
        dispatch(tastingFetchFailure('error occurred'))
      }
    }

export const tastingListSelector = (state: RootState) => state.tasting

export default tastingSlice.reducer
