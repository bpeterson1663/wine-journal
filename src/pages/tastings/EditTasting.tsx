import { Box, Button, Group } from "@mantine/core";
import { zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import Footer from "components/footer/footer.component";
import { ColorSmell, DetailsTasting, Review, Taste } from "components/form-steps";
import PageContainer from "components/page-container/page-container.component";
import { uploadImage } from "database";
import { useAppDispatch, useAppSelector } from "features/hooks";
import { editTasting } from "features/tasting/tastingSlice";
import styles from "pages/styles/pages.module.css";
import { TastingFormProvider, useTastingForm } from "pages/tastings/form-context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { INITIAL_VALUES, TastingSchema, type TastingT } from "schemas/tastings";

const EditTasting = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tasting } = useAppSelector((state) => state.tasting);
  const [loading, setLoading] = useState(false);

  const form = useTastingForm({
    validateInputOnBlur: true,
    initialValues: {
      ...INITIAL_VALUES,
      ...tasting,
    },
    validate: zodResolver(TastingSchema),
  });

  useEffect(() => {
    if (!tasting) {
      navigate("/");
    }
  }, [tasting, navigate]);

  const onSubmitHandler = async (data: TastingT) => {
    setLoading(true);
    try {
      let labelUri = data.labelUri;
      if (data.imageBlob) {
        const { error, photoUrl } = await uploadImage(data.imageBlob, "wine", data.id);
        if (!error) {
          labelUri = photoUrl;
        }
      }
      await dispatch(editTasting({ ...data, labelUri })).unwrap();
      form.resetDirty();
      notifications.show({
        message: "Your tasting was updated.",
      });
    } catch (err) {
      console.error(err);
      notifications.show({
        color: "red",
        message: "Something went wrong updating your tasting.",
      });
    } finally {
      setLoading(false);
    }
  };

  const disableSave = (): boolean => {
    if (Object.keys(form.errors).length > 0) {
      return true;
    }
    return false;
  };

  return (
    <PageContainer showCancel showWarning={form.isDirty()}>
      <TastingFormProvider form={form}>
        <Box className={styles.form} component="form" onSubmit={form.onSubmit(onSubmitHandler)}>
          <Box className={styles.section}>
            <DetailsTasting />
          </Box>
          <Box className={styles.section}>
            <ColorSmell />
          </Box>
          <Box className={styles.section}>
            <Taste />
          </Box>
          <Box className={styles.section}>
            <Review />
          </Box>
          <Footer>
            <Group style={{ width: "100%" }} justify="flex-end">
              <Button loading={loading} disabled={disableSave()} type="submit">
                Save
              </Button>
            </Group>
          </Footer>
        </Box>
      </TastingFormProvider>
    </PageContainer>
  );
};

export default EditTasting;
