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

export interface ApiResponseT {
  message: string
  success: boolean
}
