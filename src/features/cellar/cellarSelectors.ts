import { RootState } from 'features/store'
import { createSelector } from '@reduxjs/toolkit'

const wines = (state: RootState) => state.cellar.wineList

export const selectWineById = (id: string) => {
  return createSelector([wines], (wines) => wines.find((wine) => wine.id === id))
}

export const selectAllWines = () => {
  return createSelector([wines], (wines) =>
    wines.sort((a, b) => b.date.toISOString().localeCompare(a.date.toISOString())),
  )
}
