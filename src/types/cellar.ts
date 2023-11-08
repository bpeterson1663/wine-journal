export interface WineT {
  id: string
  date: string
  producer: string
  classification: string
  varietal: string[]
  subregion: string
  region: string
  country: string
  vintage: string
  userId: string
  quantity: number
  price: number
  description: string
  labelUri: string
}

export type NewWineT = Omit<WineT, 'id'>

type WineForm = Omit<WineT, 'varietal'>

export interface WineFormT extends WineForm {
  varietal: string[]
}
