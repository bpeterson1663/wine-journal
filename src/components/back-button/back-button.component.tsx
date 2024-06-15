import { Button, Group, Modal } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  label?: "Back" | "Cancel";
  showWarning?: boolean;
}

export function BackButton({ label = "Back", showWarning }: Props) {
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState(false);

  function handleNavigate() {
    if (label === "Back") {
      navigate("/");
      return;
    }
    navigate(-1);
  }

  function handleOnBack() {
    if (showWarning) {
      setOpenConfirm(true);
      return;
    }
    handleNavigate();
  }

  function handleConfirm() {
    setOpenConfirm(false);
    handleNavigate();
  }

  return (
    <>
      <Modal opened={openConfirm} onClose={() => setOpenConfirm(false)} title="Unsaved Changes">
        <Modal.Body>
          <p>Are you sure you want to leave before saving your changes?</p>
        </Modal.Body>
        <Group justify="space-between">
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button variant="outline" onClick={handleConfirm}>
            Leave
          </Button>
        </Group>
      </Modal>
      <Button p={5} mt={5} variant="subtle" onClick={handleOnBack}>
        <IconArrowLeft height={20} /> {label}
      </Button>
    </>
  );
}
