import { z } from 'zod'
import { WineSchema } from 'pages/cellar/schema'

const HueSchema = z.enum(['purple', 'ruby', 'garnet', 'tawny', 'brown', 'straw', 'yellow', 'gold', 'amber', 'pink', 'salmon', 'copper'])

export const TastingSchema = WineSchema.extend({
  hue: HueSchema
})
export type RedHueT = 'purple' | 'ruby' | 'garnet' | 'tawny' | 'brown'

export type WhiteHueT = 'straw' | 'yellow' | 'gold' | 'amber' | 'brown'

export type RoseHueT = 'pink' | 'salmon' | 'copper'

export type TastingT = z.infer<typeof TastingSchema>

// export interface TastingT {
//     id: string
//     date: string
//     producer: string
//     classification: string
//     varietal: string[]
//     subregion: string
//     region: string
//     country: string
//     vintage: string
//     hue: RedHueT | WhiteHueT | RoseHueT
//     color: ColorT
//     intensity: IntensityT
//     smell: string
//     remarks: string
//     alcohol: number
//     acidity: number
//     rating: number
//     body: number
//     tannin: number
//     sweet: number
//     userId: string
//     labelUri: string
//   }
