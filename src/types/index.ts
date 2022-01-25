export interface WineT {
  id: string
  date: string
  producer: string
  classification: string
  variety: string
  subregion: string
  region: string
  country: string
  vintage: string
  hue: string
  look: string
  smell: string
  alcohol: number
  acidity: number
  body: string
  tannin: string
  sweet: number
  userId: string
}

export interface ApiResponseT {
  message: string
  success: boolean
}
