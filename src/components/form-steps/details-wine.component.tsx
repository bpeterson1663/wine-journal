import { Box, Group, Pill, PillsInput, TextInput, FileInput, Image, rem } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useWineContext } from "pages/cellar/form-context";
import { IconUpload } from "@tabler/icons-react";
import { useFileInput } from "hooks/useFileInput";
import {
	type ChangeEvent,
	useEffect,
	useState,
} from "react";

export const DetailsWine = () => {
	const [varietals, setVarietals] = useState([""]);
	const [currentVarietal, setCurrentVarietal] = useState("");
	const {file, blob, imgPreview, handleFileChange} = useFileInput()

	const form = useWineContext();

	useEffect(() => {
		setVarietals(form.values.varietal);
		form.setFieldValue('imageBlob', blob)
	}, [form, blob]);

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

	const onVarietalBlur = () => {
		if (currentVarietal === "") {
			return
		}

		setVarietals([...varietals, currentVarietal]);
		form.setFieldValue("varietal", [...varietals, currentVarietal]);
		setCurrentVarietal("");
	};

	const onVarietalChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setCurrentVarietal(event.currentTarget.value);
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
				label="Winery / Producer"
				required
				{...form.getInputProps("producer")}
			/>

			<TextInput
				mt="xs"
				label="Name / Classification"
				{...form.getInputProps("classification")}
			/>

			<PillsInput
				mt="xs"
				label="Varietal(s)"
				required
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
						onBlur={onVarietalBlur}
						onChange={onVarietalChange}
					/>
				</Pill.Group>
			</PillsInput>

			<TextInput required mt="xs" label="Vintage" {...form.getInputProps("vintage")} />

			<TextInput required mt="xs" label="Country" {...form.getInputProps("country")} />

			<TextInput required mt="xs" label="Region" {...form.getInputProps("region")} />

			<TextInput
				mt="xs"
				label="Subregion"
				{...form.getInputProps("subregion")}
			/>

			<FileInput 
				mt="xs"
				leftSection={
					<IconUpload style={{ width: rem(18), height: rem(18) }} />
				} 
				accept="image/png,image/jpeg,image/png"
				value={file}
				placeholder="Upload a picture of the wine"
				label="Picture"
				onChange={handleFileChange}
			/>

			<Group justify="center" mt="md" align="center">													
				<Image
					radius="md"
					height={300}
					src={imgPreview || form.values.labelUri }
					alt=""
				/>
			</Group>
		</Box>
	);
};
