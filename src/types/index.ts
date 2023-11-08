import { type DocumentData } from 'firebase/firestore/lite'
import { WineT, WineFormT, NewWineT } from 'types/cellar'

export interface TastingT {
  id: string
  date: string
  producer: string
  classification: string
  varietal: string[]
  subregion: string
  region: string
  country: string
  vintage: string
  hue: RedHueT | WhiteHueT | RoseHueT
  color: ColorT
  intensity: IntensityT
  smell: string
  remarks: string
  alcohol: number
  acidity: number
  rating: number
  body: number
  tannin: number
  sweet: number
  userId: string
  labelUri: string
}

type TastingForm = Omit<TastingT, 'varietal'>

export interface TastingFormT extends TastingForm {
  varietal: string[]
}

export interface UserProfileT {
  firstName: string
  lastName: string
  userId: string
}

export interface UserT {
  _id: string
  email: string
  firstName: string
  lastName: string
}

export interface AuthUserT {
  uid: string
  email: string
}

export interface ApiResponseT {
  message: string
  success: boolean
  data?: AuthUserT
}

export interface FirebaseApiResponseT {
  message: string
  success: boolean
  data?: DocumentData
}

export interface UserExtendT extends UserT {
  password: string
}

export type SignUpT = Omit<UserExtendT, '_id'>

export type FetchStatusT = 'idle' | 'loading' | 'success' | 'error'

export type CurrentUser = AuthUserT | null

export type MessageT = string | null

export type ColorT = 'red' | 'white' | 'rose'

export type IntensityT = 'pale' | 'medium' | 'deep'

export type RedHueT = 'purple' | 'ruby' | 'garnet' | 'tawny' | 'brown'

export type WhiteHueT = 'straw' | 'yellow' | 'gold' | 'amber' | 'brown'

export type RoseHueT = 'pink' | 'salmon' | 'copper'

export type {
  WineT,
  WineFormT,
  NewWineT
}
