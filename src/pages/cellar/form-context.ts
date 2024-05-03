import { createFormContext } from "@mantine/form";
import type { WineT } from "schemas/cellar";

export const [WineFormProvider, useWineContext, useWineForm] =
	createFormContext<WineT>();
