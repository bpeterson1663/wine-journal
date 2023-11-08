import { createFormContext } from '@mantine/form'
import { WineT } from 'pages/cellar/schema'

export const [WineFormProvider, useWineContext, useWineForm] =
  createFormContext<WineT>()
