import { RootState } from 'features/store'
import { createSelector } from 'reselect'

const cellar = (state: RootState) => state.tasting.tastingList

export const selectTastingById = (id: string) => {
  return createSelector([cellar], (items) => items.find((tasting) => tasting.id === id))
}
