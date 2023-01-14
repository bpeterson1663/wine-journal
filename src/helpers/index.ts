import {
  ALCOHOL_MARKS,
  BODY_MARKS,
  SWEET_MARKS,
  TANNIN_ACIDITY_MARKS,
} from '../components/form-wine/form-wine.constants'

export const getLabel = (type: 'BODY' | 'TANNIN' | 'ACIDITY' | 'ALCOHOL' | 'SWEET', value: number) => {
  switch (type) {
    case 'BODY':
      const body = BODY_MARKS.find((mark) => mark.value === value)
      if (body) return body.label
      break
    case 'TANNIN':
    case 'ACIDITY':
      const tanninAcidity = TANNIN_ACIDITY_MARKS.find((mark) => mark.value === value)
      if (tanninAcidity) return tanninAcidity.label
      break
    case 'ALCOHOL':
      const alcohol = ALCOHOL_MARKS.find((mark) => mark.value === value)
      if (alcohol) return alcohol.label
      break
    case 'SWEET':
      const sweet = SWEET_MARKS.find((mark) => mark.value === value)
      if (sweet) return sweet.label
      break
  }
}

export const uppercaseFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}