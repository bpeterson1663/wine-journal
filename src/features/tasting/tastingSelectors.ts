import { RootState } from 'features/store'
import { createSelector } from 'reselect'

const tastings = (state: RootState) => state.tasting.tastingList

export const selectTastingById = (id: string) => {
  return createSelector([tastings], tastings => tastings.find(tasting => tasting.id === id))
}

export const selectAllTastings = () => {
  return createSelector([tastings], tastings => tastings.sort((a, b) => b.date.localeCompare(a.date)))
}
