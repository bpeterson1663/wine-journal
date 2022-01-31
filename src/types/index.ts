export interface WineT {
  id: string
  date: string
  producer: string
  classification: string
  varietal: string
  subregion: string
  region: string
  country: string
  vintage: string
  hue:
    | 'purple'
    | 'ruby'
    | 'garnet'
    | 'tawny'
    | 'brown'
    | 'straw'
    | 'yellow'
    | 'gold'
    | 'amber'
    | 'pink'
    | 'salmon'
    | 'copper'
  color: 'red' | 'white' | 'rose'
  intensity: 'pale' | 'medium' | 'deep'
  smell: string
  remarks: string
  alcohol: number
  acidity: number
  rating: number
  body: number
  tannin: number
  sweet: number
  userId: string
}
export interface UserT {
  _id: string
  email: string
  firstName: string
  lastName: string
}

export interface ApiResponseT {
  message: string
  success: boolean
  data?: UserT
}

export interface UserExtendT extends UserT {
  password: string
}

export type SignUpT = Omit<UserExtendT, '_id'>

export type FetchStatusT = 'idle' | 'loading' | 'success' | 'error'

export type CurrentUser = UserT | null

export type MessageT = string | null
