import { createFormContext } from '@mantine/form'
import { WineT } from 'schemas/cellar'

export const [WineFormProvider, useWineContext, useWineForm] = createFormContext<WineT>()
