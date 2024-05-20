import { Box, FileInput, Group, Pill, PillsInput, TextInput, Image, rem } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useTastingContext } from "pages/tastings/form-context";
import { IconUpload } from "@tabler/icons-react";

import {
	type ChangeEvent,
	useEffect,
	useState,
} from "react";

export const DetailsTasting = () => {
	const [imgPreview, setImgPreview] = useState("");
	const [varietals, setVarietals] = useState([""])
	const [currentVarietal, setCurrentVarietal] = useState("");

	const form = useTastingContext();

	useEffect(() => {
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

	const handleFileChange = (selectedFile: File | null) => {
		if (selectedFile) {
			const reader = new FileReader()
			reader.onload = (e: ProgressEvent<FileReader>) => {
				 if (e.target && e.target.result) {
					const fileBlob = new Blob([e.target.result as ArrayBuffer], { type: selectedFile.type})
					const url = URL.createObjectURL(fileBlob);

					setImgPreview(url)
					form.setFieldValue('imageBlob', fileBlob)
				}
			}

			reader.readAsArrayBuffer(selectedFile)
		}
	}

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
				label="Winery / Producer"
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
			<Group justify="center" mt="md" align="center" flex="column">
				<Image
					radius="md"
					height={300}
					src={form.values.labelUri || imgPreview}
					alt=""
				/>
				
				<FileInput 
					leftSection={
						<IconUpload style={{ width: rem(18), height: rem(18) }} />
					} 
					{...form.getInputProps("labelUri")} 
					placeholder="Add Image"
					onChange={handleFileChange}/>
				
			</Group>
		</Box>
	);
};
