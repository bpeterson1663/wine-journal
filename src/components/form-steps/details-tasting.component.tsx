import { Box, Group, Pill, PillsInput, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { WineLabelPic } from "components/camera/camera.component";
import { useTastingContext } from "pages/tastings/form-context";
import {
	type ChangeEvent,
	type KeyboardEvent,
	useEffect,
	useState,
} from "react";

export const DetailsTasting = () => {
	const [img, setImg] = useState("");
	const [varietals, setVarietals] = useState([""]);
	const [currentVarietal, setCurrentVarietal] = useState("");

	const form = useTastingContext();

	useEffect(() => {
		setImg(form.values.labelUri);
		setVarietals(form.values.varietal);
	}, [form]);

	const handleRemove = (val: string) => {
		form.setFieldValue(
			"varietal",
			varietals.filter((varietal) => varietal !== val),
		);
		setVarietals(varietals.filter((varietal) => varietal !== val));
	};

	const onDateChange = (value: Date | null) => {
		if (value) {
			form.setFieldValue("date", value);
		}
	};

	const onVarietalKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && event.currentTarget.value) {
			event.preventDefault();
			setVarietals([...varietals, currentVarietal]);
			form.setFieldValue("varietal", [...varietals, currentVarietal]);
			setCurrentVarietal("");
		}
	};

	const onVarietalChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setCurrentVarietal(event.currentTarget.value);
	};

	const onCameraChange = (value: string) => {
		form.setFieldValue("labelUri", value);
		setImg(value);
	};

	return (
		<Box>
			<DatePickerInput
				{...form.getInputProps("date")}
				valueFormat="YYYY MMM DD"
				name="date"
				label="Date"
				onChange={onDateChange}
			/>

			<TextInput
				mt="xs"
				required
				label="Producer / Winery"
				{...form.getInputProps("producer")}
			/>

			<TextInput
				mt="xs"
				label="Classification"
				{...form.getInputProps("classification")}
			/>

			<PillsInput
				mt="xs"
				label="Varietal(s)"
				{...form.getInputProps("varietal")}
			>
				<Pill.Group>
					{varietals.map((varietal) => (
						<Pill
							key={varietal}
							onRemove={() => {
								handleRemove(varietal);
							}}
							withRemoveButton
						>
							{" "}
							{varietal}
						</Pill>
					))}
					<PillsInput.Field
						value={currentVarietal}
						onKeyDown={onVarietalKeyDown}
						onChange={onVarietalChange}
						placeholder="Press enter after each varietal"
					/>
				</Pill.Group>
			</PillsInput>

			<TextInput mt="xs" label="Vintage" {...form.getInputProps("vintage")} />

			<TextInput mt="xs" label="Country" {...form.getInputProps("country")} />

			<TextInput mt="xs" label="Region" {...form.getInputProps("region")} />

			<TextInput
				mt="xs"
				label="Subregion"
				{...form.getInputProps("subregion")}
			/>
			<Group justify="center" mt="md">
				<WineLabelPic value={img} onChange={onCameraChange} />
			</Group>
		</Box>
	);
};
