import { Box, Button, Group } from "@mantine/core";
import { zodResolver } from "@mantine/form";
import Footer from "components/footer/footer.component";
import PageContainer from "components/page-container/page-container.component";
import { useEffect } from "react";

import { notifications } from "@mantine/notifications";
import { DetailsWine, Quantity } from "components/form-steps";
import { editWine } from "features/cellar/cellarSlice";
import { useAppDispatch, useAppSelector } from "features/hooks";
import { WineFormProvider, useWineForm } from "pages/cellar/form-context";
import styles from "pages/styles/pages.module.css";
import { useNavigate } from "react-router-dom";
import { INITIAL_VALUES, WineSchema, type WineT } from "schemas/cellar";

export default function EditWine() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { wine } = useAppSelector((state) => state.cellar);
  useEffect(() => {
    if (!wine) {
      navigate("/cellar");
    }
  }, [wine, navigate]);
  const form = useWineForm({
    initialValues: {
      ...INITIAL_VALUES,
      ...wine,
      date: wine ? wine.date : new Date(),
    },
    validate: zodResolver(WineSchema),
  });

  const onSubmitHandler = async (data: WineT) => {
    try {
      await dispatch(editWine({ ...data })).unwrap();
      notifications.show({
        message: "Edits were saved.",
      });
    } catch (err) {
      console.error(err);
      notifications.show({
        color: "red",
        message: "An error occurred trying to save your edits. Please try again later.",
      });
    }
  };

  const disableSave = (): boolean => {
    if (Object.keys(form.errors).length > 0) {
      return true;
    }

    return false;
  };

  return (
    <PageContainer showCancel>
      <WineFormProvider form={form}>
        <Box className={styles.form} component="form" onSubmit={form.onSubmit(onSubmitHandler)}>
          <Box>
            <DetailsWine />
          </Box>
          <Box style={{ marginBottom: "100px" }}>
            <Quantity />
          </Box>
          <Footer>
            <Group style={{ width: "100%" }} justify="flex-end">
              <Button disabled={disableSave()} type="submit">
                Save
              </Button>
            </Group>
          </Footer>
        </Box>
      </WineFormProvider>
    </PageContainer>
  );
}
