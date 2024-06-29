import { Box, Group, Slider, Text, Tooltip } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import styles from "components/form-steps/form-steps.module.css";
import {
  ALCOHOL_MARKS,
  BODY_MARKS,
  SWEET_MARKS,
  TANNIN_ACIDITY_MARKS,
} from "components/form-tasting/form-tasting.constants";
import { getLabel } from "helpers";
import { useTastingContext } from "pages/tastings/form-context";
export const Taste = () => {
  const form = useTastingContext();

  return (
    <Box mt={10}>
      <Group>
        <Text className={styles["form-label"]}>Body</Text>
        <Tooltip label="How the wine feels in your mouth. The heavier the feel, the fuller the body.">
          <IconInfoCircle />
        </Tooltip>
      </Group>
      <Slider
        classNames={{
          root: styles.slider,
          markLabel: styles["mark-label"],
        }}
        showLabelOnHover={false}
        max={5}
        min={1}
        step={1}
        marks={BODY_MARKS}
        label={getLabel("BODY", form.values.body)}
        {...form.getInputProps("body")}
      />
      <Group>
        <Text className={styles["form-label"]}>Tannin</Text>
        <Tooltip label="The drying out feeling you get in your mouth. The more dry your mouth feels, the higher the tannin.">
          <IconInfoCircle />
        </Tooltip>
      </Group>

      <Slider
        classNames={{
          root: styles.slider,
          markLabel: styles["mark-label"],
        }}
        showLabelOnHover={false}
        max={5}
        min={1}
        step={1}
        marks={TANNIN_ACIDITY_MARKS}
        label={getLabel("TANNIN", form.values.tannin)}
        {...form.getInputProps("tannin")}
      />
      <Group>
        <Text className={styles["form-label"]}>Acidity</Text>
        <Tooltip label="The more acidic the wine, the more it makes you salivate. Higher acidic wines are usually crisp and tart while a low acid whine is softer and rounder.">
          <IconInfoCircle />
        </Tooltip>
      </Group>
      <Slider
        classNames={{
          root: styles.slider,
          markLabel: styles["mark-label"],
        }}
        showLabelOnHover={false}
        max={5}
        min={1}
        step={1}
        marks={TANNIN_ACIDITY_MARKS}
        label={getLabel("ACIDITY", form.values.acidity)}
        {...form.getInputProps("acidity")}
      />
      <Group>
        <Text className={styles["form-label"]}>Alcohol(%)</Text>
        <Tooltip label="Alcohol contributes to the overall weight and physical sensation of the wine. Higher alcohol wines are usually bolder while lower alcohol wines are lighter in body.">
          <IconInfoCircle />
        </Tooltip>
      </Group>
      <Slider
        classNames={{
          root: styles.slider,
          markLabel: styles["mark-label"],
        }}
        showLabelOnHover={false}
        max={5}
        min={1}
        step={1}
        marks={ALCOHOL_MARKS}
        label={getLabel("ALCOHOL", form.values.alcohol)}
        {...form.getInputProps("alcohol")}
      />
      <Group>
        <Text className={styles["form-label"]}>Sweetness</Text>
        <Tooltip label="The amount of sugar in the wine. Sweetness contributes to the wines flavor profile.">
          <IconInfoCircle />
        </Tooltip>
      </Group>
      <Slider
        classNames={{
          root: styles.slider,
          markLabel: styles["mark-label"],
        }}
        showLabelOnHover={false}
        max={5}
        min={1}
        step={1}
        marks={SWEET_MARKS}
        label={getLabel("SWEET", form.values.sweet)}
        {...form.getInputProps("sweet")}
      />
    </Box>
  );
};
