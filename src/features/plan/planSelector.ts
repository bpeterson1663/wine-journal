import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "features/store";

const plans = (state: RootState) => state.plan.planList;

const BEGINNER_PLAN_ID = "pN13ZAhINkFQvoCwOTg2";

export const selectBeginnerPlan = () => {
  return createSelector([plans], (plans) => plans.find((plan) => plan.id === BEGINNER_PLAN_ID));
};
