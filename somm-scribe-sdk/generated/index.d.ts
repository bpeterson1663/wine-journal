import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';
export const connectorConfig: ConnectorConfig;

export type TimestampString = string;

export type UUIDString = string;

export type Int64String = string;

export type DateString = string;


export interface CreatePlanResponse {
  plan_insert: Plan_Key;
}

export interface CreatePlanVariables {
  name?: string | null;
  price?: number | null;
  maxWine?: number | null;
  maxTasting?: number | null;
  description?: string | null;
  upgradablePlans?: string[] | null;
  downgradablePlans?: string[] | null;
  isActive?: boolean | null;
  trialLength?: number | null;
}

export interface CreateTastingResponse {
  tasting_insert: Tasting_Key;
}

export interface CreateTastingVariables {
  user?: User_Key | null;
  classification?: string | null;
  country?: string | null;
  date?: TimestampString | null;
  description?: string | null;
  labelUri?: string | null;
  price?: number | null;
  producer?: string | null;
  quantity?: number | null;
  region?: string | null;
  subregion?: string | null;
  varietal?: string[] | null;
  vintage?: string | null;
  hue?: string | null;
  color?: string | null;
  intensity?: string | null;
  smell?: string | null;
  alcohol?: number | null;
  acidity?: number | null;
  tannin?: number | null;
  sweet?: number | null;
  body?: number | null;
  rating?: number | null;
  remarks?: string | null;
}

export interface CreateUserResponse {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  avatar?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  displayName?: string | null;
  userId?: string | null;
  email?: string | null;
  plan?: Plan_Key | null;
  trialExpires?: TimestampString | null;
  isPaid?: boolean | null;
}

export interface CreateWineResponse {
  wine_insert: Wine_Key;
}

export interface CreateWineVariables {
  user?: User_Key | null;
  classification?: string | null;
  country?: string | null;
  date?: TimestampString | null;
  description?: string | null;
  labelUri?: string | null;
  price?: number | null;
  producer?: string | null;
  quantity?: number | null;
  region?: string | null;
  subregion?: string | null;
  varietal?: string[] | null;
  vintage?: string | null;
}

export interface DeleteTastingResponse {
  tasting_delete?: Tasting_Key | null;
}

export interface DeleteTastingVariables {
  id: UUIDString;
}

export interface DeleteWineResponse {
  wine_delete?: Wine_Key | null;
}

export interface DeleteWineVariables {
  id: UUIDString;
}

export interface GetUserByIdResponse {
  users: ({
    firstName: string;
    lastName: string;
    avatar?: string | null;
    displayName?: string | null;
    userId: string;
    email: string;
    plan: {
      id: UUIDString;
    } & Plan_Key;
      trialExpires: TimestampString;
      isPaid: boolean;
      id: UUIDString;
  } & User_Key)[];
}

export interface GetUserByIdVariables {
  userId?: string | null;
}

export interface ListPlansResponse {
  plans: ({
    name: string;
    id: UUIDString;
    price: number;
    maxWine?: number | null;
    maxTasting?: number | null;
    description: string;
    upgradablePlans: string[];
    downgradablePlans: string[];
    isActive: boolean;
    trialLength: number;
  } & Plan_Key)[];
}

export interface ListTastingsResponse {
  tastings: ({
    id: UUIDString;
    userId: UUIDString;
    classification?: string | null;
    country: string;
    date: TimestampString;
    description?: string | null;
    labelUri?: string | null;
    price?: number | null;
    producer: string;
    quantity?: number | null;
    region: string;
    subregion?: string | null;
    varietal: string[];
    vintage: string;
    hue: string;
    color: string;
    intensity: string;
    smell: string;
    alcohol: number;
    acidity: number;
    tannin: number;
    sweet: number;
    body: number;
    rating: number;
    remarks?: string | null;
  } & Tasting_Key)[];
}

export interface ListTastingsVariables {
  userId?: string | null;
}

export interface ListWinesResponse {
  wines: ({
    id: UUIDString;
    userId: UUIDString;
    classification?: string | null;
    country: string;
    date: TimestampString;
    description?: string | null;
    labelUri?: string | null;
    price?: number | null;
    producer: string;
    quantity?: number | null;
    region: string;
    subregion?: string | null;
    varietal: string[];
    vintage: string;
  } & Wine_Key)[];
}

export interface ListWinesVariables {
  userId?: string | null;
}

export interface Plan_Key {
  id: UUIDString;
  __typename?: 'Plan_Key';
}

export interface Tasting_Key {
  id: UUIDString;
  __typename?: 'Tasting_Key';
}

export interface UpdateTastingResponse {
  tasting_update?: Tasting_Key | null;
}

export interface UpdateTastingVariables {
  id?: UUIDString | null;
  classification?: string | null;
  country?: string | null;
  date?: TimestampString | null;
  description?: string | null;
  labelUri?: string | null;
  price?: number | null;
  producer?: string | null;
  quantity?: number | null;
  region?: string | null;
  subregion?: string | null;
  varietal?: string[] | null;
  vintage?: string | null;
  hue?: string | null;
  color?: string | null;
  intensity?: string | null;
  smell?: string | null;
  alcohol?: number | null;
  acidity?: number | null;
  tannin?: number | null;
  sweet?: number | null;
  body?: number | null;
  rating?: number | null;
  remarks?: string | null;
}

export interface UpdateWineResponse {
  wine_update?: Wine_Key | null;
}

export interface UpdateWineVariables {
  id?: UUIDString | null;
  classification?: string | null;
  country?: string | null;
  date?: TimestampString | null;
  description?: string | null;
  labelUri?: string | null;
  price?: number | null;
  producer?: string | null;
  quantity?: number | null;
  region?: string | null;
  subregion?: string | null;
  varietal?: string[] | null;
  vintage?: string | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface Wine_Key {
  id: UUIDString;
  __typename?: 'Wine_Key';
}



/* Allow users to create refs without passing in DataConnect */
export function createPlanRef(vars?: CreatePlanVariables): MutationRef<CreatePlanResponse, CreatePlanVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createPlanRef(dc: DataConnect, vars?: CreatePlanVariables): MutationRef<CreatePlanResponse,CreatePlanVariables>;

export function createPlan(vars?: CreatePlanVariables): MutationPromise<CreatePlanResponse, CreatePlanVariables>;
export function createPlan(dc: DataConnect, vars?: CreatePlanVariables): MutationPromise<CreatePlanResponse,CreatePlanVariables>;


/* Allow users to create refs without passing in DataConnect */
export function createUserRef(vars?: CreateUserVariables): MutationRef<CreateUserResponse, CreateUserVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createUserRef(dc: DataConnect, vars?: CreateUserVariables): MutationRef<CreateUserResponse,CreateUserVariables>;

export function createUser(vars?: CreateUserVariables): MutationPromise<CreateUserResponse, CreateUserVariables>;
export function createUser(dc: DataConnect, vars?: CreateUserVariables): MutationPromise<CreateUserResponse,CreateUserVariables>;


/* Allow users to create refs without passing in DataConnect */
export function createWineRef(vars?: CreateWineVariables): MutationRef<CreateWineResponse, CreateWineVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createWineRef(dc: DataConnect, vars?: CreateWineVariables): MutationRef<CreateWineResponse,CreateWineVariables>;

export function createWine(vars?: CreateWineVariables): MutationPromise<CreateWineResponse, CreateWineVariables>;
export function createWine(dc: DataConnect, vars?: CreateWineVariables): MutationPromise<CreateWineResponse,CreateWineVariables>;


/* Allow users to create refs without passing in DataConnect */
export function createTastingRef(vars?: CreateTastingVariables): MutationRef<CreateTastingResponse, CreateTastingVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createTastingRef(dc: DataConnect, vars?: CreateTastingVariables): MutationRef<CreateTastingResponse,CreateTastingVariables>;

export function createTasting(vars?: CreateTastingVariables): MutationPromise<CreateTastingResponse, CreateTastingVariables>;
export function createTasting(dc: DataConnect, vars?: CreateTastingVariables): MutationPromise<CreateTastingResponse,CreateTastingVariables>;


/* Allow users to create refs without passing in DataConnect */
export function updateWineRef(vars?: UpdateWineVariables): MutationRef<UpdateWineResponse, UpdateWineVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateWineRef(dc: DataConnect, vars?: UpdateWineVariables): MutationRef<UpdateWineResponse,UpdateWineVariables>;

export function updateWine(vars?: UpdateWineVariables): MutationPromise<UpdateWineResponse, UpdateWineVariables>;
export function updateWine(dc: DataConnect, vars?: UpdateWineVariables): MutationPromise<UpdateWineResponse,UpdateWineVariables>;


/* Allow users to create refs without passing in DataConnect */
export function updateTastingRef(vars?: UpdateTastingVariables): MutationRef<UpdateTastingResponse, UpdateTastingVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateTastingRef(dc: DataConnect, vars?: UpdateTastingVariables): MutationRef<UpdateTastingResponse,UpdateTastingVariables>;

export function updateTasting(vars?: UpdateTastingVariables): MutationPromise<UpdateTastingResponse, UpdateTastingVariables>;
export function updateTasting(dc: DataConnect, vars?: UpdateTastingVariables): MutationPromise<UpdateTastingResponse,UpdateTastingVariables>;


/* Allow users to create refs without passing in DataConnect */
export function deleteWineRef(vars: DeleteWineVariables): MutationRef<DeleteWineResponse, DeleteWineVariables>;
/* Allow users to pass in custom DataConnect instances */
export function deleteWineRef(dc: DataConnect, vars: DeleteWineVariables): MutationRef<DeleteWineResponse,DeleteWineVariables>;

export function deleteWine(vars: DeleteWineVariables): MutationPromise<DeleteWineResponse, DeleteWineVariables>;
export function deleteWine(dc: DataConnect, vars: DeleteWineVariables): MutationPromise<DeleteWineResponse,DeleteWineVariables>;


/* Allow users to create refs without passing in DataConnect */
export function deleteTastingRef(vars: DeleteTastingVariables): MutationRef<DeleteTastingResponse, DeleteTastingVariables>;
/* Allow users to pass in custom DataConnect instances */
export function deleteTastingRef(dc: DataConnect, vars: DeleteTastingVariables): MutationRef<DeleteTastingResponse,DeleteTastingVariables>;

export function deleteTasting(vars: DeleteTastingVariables): MutationPromise<DeleteTastingResponse, DeleteTastingVariables>;
export function deleteTasting(dc: DataConnect, vars: DeleteTastingVariables): MutationPromise<DeleteTastingResponse,DeleteTastingVariables>;


/* Allow users to create refs without passing in DataConnect */
export function listPlansRef(): QueryRef<ListPlansResponse, undefined>;/* Allow users to pass in custom DataConnect instances */
export function listPlansRef(dc: DataConnect): QueryRef<ListPlansResponse,undefined>;

export function listPlans(): QueryPromise<ListPlansResponse, undefined>;
export function listPlans(dc: DataConnect): QueryPromise<ListPlansResponse,undefined>;


/* Allow users to create refs without passing in DataConnect */
export function listWinesRef(vars?: ListWinesVariables): QueryRef<ListWinesResponse, ListWinesVariables>;
/* Allow users to pass in custom DataConnect instances */
export function listWinesRef(dc: DataConnect, vars?: ListWinesVariables): QueryRef<ListWinesResponse,ListWinesVariables>;

export function listWines(vars?: ListWinesVariables): QueryPromise<ListWinesResponse, ListWinesVariables>;
export function listWines(dc: DataConnect, vars?: ListWinesVariables): QueryPromise<ListWinesResponse,ListWinesVariables>;


/* Allow users to create refs without passing in DataConnect */
export function listTastingsRef(vars?: ListTastingsVariables): QueryRef<ListTastingsResponse, ListTastingsVariables>;
/* Allow users to pass in custom DataConnect instances */
export function listTastingsRef(dc: DataConnect, vars?: ListTastingsVariables): QueryRef<ListTastingsResponse,ListTastingsVariables>;

export function listTastings(vars?: ListTastingsVariables): QueryPromise<ListTastingsResponse, ListTastingsVariables>;
export function listTastings(dc: DataConnect, vars?: ListTastingsVariables): QueryPromise<ListTastingsResponse,ListTastingsVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getUserByIdRef(vars?: GetUserByIdVariables): QueryRef<GetUserByIdResponse, GetUserByIdVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getUserByIdRef(dc: DataConnect, vars?: GetUserByIdVariables): QueryRef<GetUserByIdResponse,GetUserByIdVariables>;

export function getUserById(vars?: GetUserByIdVariables): QueryPromise<GetUserByIdResponse, GetUserByIdVariables>;
export function getUserById(dc: DataConnect, vars?: GetUserByIdVariables): QueryPromise<GetUserByIdResponse,GetUserByIdVariables>;


