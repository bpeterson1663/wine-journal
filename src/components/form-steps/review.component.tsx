import { Box, Group, Rating, Text, Textarea, rem } from "@mantine/core";
import { IconMoodCrazyHappy, IconMoodCry, IconMoodHappy, IconMoodSad, IconMoodSmile } from "@tabler/icons-react";
import styles from "components/form-steps/form-steps.module.css";
import { useTastingContext } from "pages/tastings/form-context";

export const Review = () => {
  const form = useTastingContext();

  const getIconStyle = (color?: string) => ({
    width: rem(48),
    height: rem(48),
    color: color ? `var(--mantine-color-${color}-7)` : undefined,
  });

  const getEmptyIcon = (value: number) => {
    const iconStyle = getIconStyle();

    switch (value) {
      case 1:
        return <IconMoodCry style={iconStyle} />;
      case 2:
        return <IconMoodSad style={iconStyle} />;
      case 3:
        return <IconMoodSmile style={iconStyle} />;
      case 4:
        return <IconMoodHappy style={iconStyle} />;
      case 5:
        return <IconMoodCrazyHappy style={iconStyle} />;
      default:
        return null;
    }
  };

  const getFullIcon = (value: number) => {
    switch (value) {
      case 1:
        return <IconMoodCry style={getIconStyle("red")} />;
      case 2:
        return <IconMoodSad style={getIconStyle("orange")} />;
      case 3:
        return <IconMoodSmile style={getIconStyle("yellow")} />;
      case 4:
        return <IconMoodHappy style={getIconStyle("lime")} />;
      case 5:
        return <IconMoodCrazyHappy style={getIconStyle("green")} />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Textarea autosize minRows={4} maxRows={4} id="remarks" label="Remarks" {...form.getInputProps("remarks")} />
      <Text className={styles["form-label"]}>Rating</Text>

      <Group justify="center">
        <Rating
          className={styles.rating}
          emptySymbol={getEmptyIcon}
          fullSymbol={getFullIcon}
          highlightSelectedOnly
          size="xl"
          {...form.getInputProps("rating")}
        />
      </Group>
    </Box>
  );
};
