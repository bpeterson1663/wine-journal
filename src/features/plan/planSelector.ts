import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "features/store";

const plans = (state: RootState) => state.plan.planList;

const BEGINNER_PLAN_ID = "2241b29e996448ee8acd0a3bd84ca27a";

export const selectBeginnerPlan = () => {
  return createSelector([plans], (plans) => plans.find((plan) => plan.id === BEGINNER_PLAN_ID));
};
