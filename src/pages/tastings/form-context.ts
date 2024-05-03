import { createFormContext } from "@mantine/form";
import type { TastingT } from "schemas/tastings";

export const [TastingFormProvider, useTastingContext, useTastingForm] =
	createFormContext<TastingT>();
