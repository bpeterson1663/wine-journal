import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "features/store";
import type { PlanT } from "schemas/plans";

const plans = (state: RootState) => state.plan.planList;
const user = (state: RootState) => state.user.userProfile;

const BEGINNER_PLAN_ID = "2241b29e996448ee8acd0a3bd84ca27a";

const DEFAULT_PLAN: PlanT = {
  id: BEGINNER_PLAN_ID,
  price: 2.99,
  name: "Beginner",
  description: "For those that are just starting your wine journey.",
  maxTasting: 50,
  maxWine: 0,
  upgradablePlans: [],
  downgradablePlans: [],
  isActive: true,
  trialLength: 14,
};

export const selectBeginnerPlan = () => {
  return createSelector([plans], (plans) => plans.find((plan) => plan.id === BEGINNER_PLAN_ID));
};

export const selectUserPlan = createSelector([plans, user], (plans, user) => {
  const plan = plans.find((plan) => plan.id === user?.planId);
  return plan ?? DEFAULT_PLAN;
});
