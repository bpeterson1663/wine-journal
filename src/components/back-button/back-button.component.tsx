import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface Props {
  label?: string;
}

export function BackButton({ label = "Back" }: Props) {
  const navigate = useNavigate();
  return (
    <Button p={5} mt={5} variant="subtle" onClick={() => navigate(-1)}>
      <IconArrowLeft height={20} /> {label}
    </Button>
  );
}
