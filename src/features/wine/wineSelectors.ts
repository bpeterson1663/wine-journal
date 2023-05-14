import { RootState } from 'features/store'
import { createSelector } from 'reselect'

const cellar = (state: RootState) => state.wine.wineList

export const selectWineById = (id: string) => {
  return createSelector([cellar], (items) => items.find((wine) => wine.id === id))
}