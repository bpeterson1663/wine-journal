import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "features/store";

const tastings = (state: RootState) => state.tasting.tastingList;

export const selectTastingById = (id: string) => {
  return createSelector([tastings], (tastings) => tastings.find((tasting) => tasting.id === id));
};

export const selectAllTastings = createSelector(tastings, (tastings) => {
  return [...tastings].sort((a, b) => b.date.toISOString().localeCompare(a.date.toISOString()));
});
