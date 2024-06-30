import { Autocomplete, Box, FileInput, Group, Image, Pill, PillsInput, TextInput, rem } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconUpload } from "@tabler/icons-react";
import { countries } from "countries-list";
import { useFileInput } from "hooks/useFileInput";
import { useTastingContext } from "pages/tastings/form-context";
import { type ChangeEvent, type KeyboardEvent, useEffect, useState } from "react";

export const DetailsTasting = () => {
  const [varietals, setVarietals] = useState([""]);
  const [currentVarietal, setCurrentVarietal] = useState("");
  const { file, blob, imgPreview, handleFileChange } = useFileInput();
  const form = useTastingContext();

  const countryList = Object.values(countries).map((country) => country.name);

  useEffect(() => {
    setVarietals(form.values.varietal);
    form.setFieldValue("imageBlob", blob);
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

  const onVarietalKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (currentVarietal === "") {
        return;
      }

      setVarietals([...varietals, currentVarietal]);
      form.setFieldValue("varietal", [...varietals, currentVarietal]);
      setCurrentVarietal("");
    }
  };

  const onVarietalBlur = () => {
    if (currentVarietal === "") {
      return;
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

      <TextInput mt="xs" required label="Winery / Producer" {...form.getInputProps("producer")} />

      <TextInput mt="xs" label="Name / Classification" {...form.getInputProps("classification")} />

      <PillsInput mt="xs" label="Varietal(s)" required {...form.getInputProps("varietal")}>
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
            onKeyDown={onVarietalKeyDown}
            onChange={onVarietalChange}
          />
        </Pill.Group>
      </PillsInput>

      <TextInput required mt="xs" label="Vintage" {...form.getInputProps("vintage")} />

      <Autocomplete
        autoComplete="country"
        data={countryList}
        required
        mt="xs"
        label="Country"
        {...form.getInputProps("country")}
      />

      <TextInput required mt="xs" label="Region" {...form.getInputProps("region")} />

      <TextInput mt="xs" label="Subregion" {...form.getInputProps("subregion")} />

      <FileInput
        mt="xs"
        leftSection={<IconUpload style={{ width: rem(18), height: rem(18) }} />}
        accept="image/png,image/jpeg,image/png"
        value={file}
        placeholder="Upload a picture of the wine"
        label="Picture"
        onChange={handleFileChange}
      />

      {(imgPreview || form.values.labelUri) && (
        <Group justify="center" mt="md" align="center">
          <Image radius="md" height={300} src={imgPreview || form.values.labelUri} alt="" />
        </Group>
      )}
    </Box>
  );
};
