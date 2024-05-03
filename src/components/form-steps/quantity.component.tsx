import { Box, NumberInput, Textarea } from "@mantine/core";
import { useWineForm } from "pages/cellar/form-context";

export const Quantity = () => {
	const form = useWineForm();
	return (
		<Box>
			<NumberInput label="Quantity" {...form.getInputProps("quantity")} />
			<NumberInput label="Price" {...form.getInputProps("price")} />
			<Textarea
				autosize
				maxRows={4}
				label="Description"
				{...form.getInputProps("description")}
			/>
		</Box>
	);
};
