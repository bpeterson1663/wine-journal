import { createFormContext } from '@mantine/form'
import { TastingT } from 'pages/tastings/schema'

export const [TastingFormProvider, useTastingContext, useTastingForm] =
  createFormContext<TastingT>()
