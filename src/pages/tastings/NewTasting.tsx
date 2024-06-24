import { Box, Button, Group, Stepper } from "@mantine/core";
import { zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import Footer from "components/footer/footer.component";
import { ColorSmell, DetailsTasting, Review, Taste } from "components/form-steps";
import PageContainer from "components/page-container/page-container.component";
import { uploadImage } from "database";
import { editWine } from "features/cellar/cellarSlice";
import { useAppDispatch, useAppSelector } from "features/hooks";
import { createTastingThunk, editTasting } from "features/tasting/tastingSlice";
import styles from "pages/styles/pages.module.css";
import { TastingFormProvider, useTastingForm } from "pages/tastings/form-context";
import { useState } from "react";
import { INITIAL_VALUES, TastingSchema, type TastingT } from "schemas/tastings";

const STEPS = [
  {
    label: "Details",
  },
  {
    label: "Color and Smell",
  },
  {
    label: "Taste",
  },
  {
    label: "Remarks and Review",
  },
];

const NewTasting = () => {
  const dispatch = useAppDispatch();
  const { tastingOpen } = useAppSelector((state) => state.tasting);
  const { currentUser } = useAppSelector((state) => state.auth);
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const form = useTastingForm({
    validateInputOnBlur: true,
    initialValues: {
      ...INITIAL_VALUES,
      ...tastingOpen,
      userId: currentUser?.uid ?? ""
    },
    validate: zodResolver(TastingSchema),
  });

  const onSubmitHandler = async (data: TastingT) => {
    setIsLoading(true);
    try {
      if (tastingOpen) {
        const quantity = tastingOpen.quantity > 0 ? tastingOpen.quantity - 1 : 0;
        dispatch(editWine({ ...tastingOpen, quantity })).unwrap();
      }

      const { id } = await dispatch(createTastingThunk({ ...data, userId: currentUser?.uid ?? "" })).unwrap();

      if (data.imageBlob) {
        const { error, photoUrl } = await uploadImage(data.imageBlob, "wine", id);
        if (!error) {
          await dispatch(editTasting({ ...data, id, labelUri: photoUrl })).unwrap();
        }
      }

      form.reset();
      setActiveStep(STEPS.length);
      notifications.show({
        message: "Your tasting notes were saved.",
      });
    } catch (err) {
      console.error(err);
      notifications.show({
        color: "red",
        message: "Something went wrong creating your tasting notes.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrevious = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (index: number) => {
    switch (index) {
      case 0:
        return <DetailsTasting />;
      case 1:
        return <ColorSmell />;
      case 2:
        return <Taste />;
      case 3:
        return <Review />;
      default:
        break;
    }
  };

  const disableContinue = (): boolean => {
    const { errors, isTouched } = form;

    if (activeStep === 0) {
      if (tastingOpen) {
        return false;
      }

      if (
        !isTouched("producer") ||
        !isTouched("country") ||
        !isTouched("region") ||
        !isTouched("vintage") ||
        !isTouched("varietal")
      ) {
        return true;
      }
    } else if (activeStep === 1) {
      if (!isTouched("smell")) {
        return true;
      }
    }

    if (Object.keys(errors).length > 0) {
      return true;
    }
    return false;
  };

  const Actions = () => {
    if (activeStep !== STEPS.length) {
      return (
        <Group style={{ width: "100%" }} justify="space-between">
          <Button disabled={activeStep === 0 || isLoading} onClick={handlePrevious} style={{ mt: 1, mr: 1 }}>
            Previous
          </Button>
          {activeStep === STEPS.length - 1 ? (
            <Button type="submit" loading={isLoading}>
              Submit
            </Button>
          ) : (
            <Button disabled={disableContinue()} onClick={handleNext} style={{ mt: 1, mr: 1 }}>
              Continue
            </Button>
          )}
        </Group>
      );
    }

    return (
      <Group justify="flex-end">
        <Button onClick={handleReset} style={{ mt: 1, mr: 1 }}>
          Add Another Entry
        </Button>
      </Group>
    );
  };

  return (
    <PageContainer showCancel showWarning={form.isDirty()}>
      <TastingFormProvider form={form}>
        <Box className={styles.form} component="form" onSubmit={form.onSubmit(onSubmitHandler)}>
          <Stepper
            styles={{
              stepBody: {
                display: "none",
              },
            }}
            active={activeStep}
            allowNextStepsSelect={false}
          >
            {STEPS.map((step, index) => (
              <Stepper.Step key={step.label} label={step.label}>
                <Box style={{ width: "100%" }}>{getStepContent(index)}</Box>
              </Stepper.Step>
            ))}
          </Stepper>
          <Footer>
            <Actions />
          </Footer>
        </Box>
      </TastingFormProvider>
    </PageContainer>
  );
};

export default NewTasting;
