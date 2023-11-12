import { createFormContext } from '@mantine/form'
import { TastingT } from 'schemas/tastings'

export const [TastingFormProvider, useTastingContext, useTastingForm] =
  createFormContext<TastingT>()
