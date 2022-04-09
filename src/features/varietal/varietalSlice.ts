import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getVarietals, addVarietal } from '../../api'
import { FetchStatusT, MessageT, VarietalT } from '../../types'
import { RootState, AppThunk } from '../store'

interface InitialVarietalState {
  message: MessageT
  status: FetchStatusT
  varietalList: VarietalT[]
}

const initialState: InitialVarietalState = {
  message: null,
  status: 'idle',
  varietalList: [],
}

export const varietalSlice = createSlice({
  name: 'varietal',
  initialState,
  reducers: {
    varietalFetchStart: (state) => {
      state.status = 'loading'
    },
    varietalListFetchSuccess: (state, action: PayloadAction<VarietalT[]>) => {
      state.status = 'success'
      state.varietalList = action.payload
      state.message = null
    },
    varietalCreateFetchSuccess: (state, action: PayloadAction<{ varietal: VarietalT; message: string }>) => {
      state.status = 'success'
      state.message = action.payload.message
      state.varietalList = [...state.varietalList, action.payload.varietal]
    },
    varietalFetchFailure: (state, action: PayloadAction<MessageT>) => {
      state.status = 'error'
      state.message = action.payload
    },
  },
})

export const { varietalFetchStart, varietalListFetchSuccess, varietalCreateFetchSuccess, varietalFetchFailure } =
  varietalSlice.actions

export const fetchVarietalListStart = (): AppThunk => async (dispatch) => {
  try {
    dispatch(varietalFetchStart)
    const response = await getVarietals()
    const { success, data, message } = response
    if (success && data) {
      dispatch(varietalListFetchSuccess(data))
    } else {
      dispatch(varietalFetchFailure(message))
    }
  } catch (err) {
    dispatch(varietalFetchFailure)
  }
}

export const fetchVarietalCreateStart =
  (payload: VarietalT): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(varietalFetchStart())
      const response = await addVarietal(payload)
      const { success, message } = response
      if (success) {
        dispatch(varietalCreateFetchSuccess({ varietal: payload, message }))
      } else {
        dispatch(varietalFetchFailure(message))
      }
    } catch (err) {
      dispatch(varietalFetchFailure(`error ${err}`))
    }
  }

export const varietalListSelector = (state: RootState) => state.varietal

export default varietalSlice.reducer
