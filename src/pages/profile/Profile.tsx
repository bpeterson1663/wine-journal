import { Avatar, Box, Button, FileInput, Group, TextInput, rem } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconUpload } from "@tabler/icons-react";
import Footer from "components/footer/footer.component";
import PageContainer from "components/page-container/page-container.component";
import { fetchLogout } from "features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "features/hooks";
import { editUserProfile } from "features/user/userSlice";
import { useFileInput } from "hooks/useFileInput";
import { useMobile } from "hooks/useMobile";
import styles from "pages/styles/pages.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfileSchema, type UserProfileT, defaultUserProfile } from "schemas/user";

export default function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { userProfile } = useAppSelector((state) => state.user);
  const isMobile = useMobile();
  const { file, blob, handleFileChange, handleFileUpload } = useFileInput();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      ...defaultUserProfile,
      ...userProfile,
      id: userProfile?.id ?? "",
      userId: currentUser?.uid ?? "",
      email: currentUser?.email ?? "",
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: zodResolver(UserProfileSchema),
  });

  useEffect(() => {
    form.setFieldValue("imageBlob", blob);
  }, [form, blob]);

  const handleLogout = async () => {
    await dispatch(fetchLogout(null));
    if (!currentUser) {
      navigate("/");
    }
  };

  const onSubmitHandler = async (data: UserProfileT) => {
    setLoading(true);

    try {
      let avatar = data.avatar;
      if (data.imageBlob) {
        const { error, photoUrl } = await handleFileUpload(data.imageBlob, "user", currentUser?.uid ?? "");
        if (!error) {
          avatar = photoUrl;
        }
      }

      await dispatch(editUserProfile({ ...data, avatar }));

      notifications.show({
        message: "Your profile was saved.",
      });
    } catch (err) {
      notifications.show({
        color: "red",
        message: "An error occurred trying to save your profile. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Profile" showBack>
      <Group justify="space-between">
        <Box mr="auto" ml="auto">
          <Avatar
            color="white"
            className={styles.avatar}
            radius="lg"
            size={isMobile ? 200 : 300}
            src={userProfile?.avatar}
          />
        </Box>
        <Box w={400}>
          <form onSubmit={form.onSubmit(onSubmitHandler)}>
            <TextInput required mt="xs" type="firstName" label="First Name" {...form.getInputProps("firstName")} />
            <TextInput required mt="xs" type="lastName" label="Last Name" {...form.getInputProps("lastName")} />
            <TextInput mt="xs" type="email" label="Email" disabled {...form.getInputProps("email")} />
            <TextInput mt="xs" type="displayName" label="Display Name" {...form.getInputProps("displayName")} />
            <FileInput
              {...form.getInputProps("imageBlob")}
              mt="xs"
              leftSection={<IconUpload style={{ width: rem(18), height: rem(18) }} />}
              label="Avatar"
              placeholder="Upload avatar"
              value={file}
              onChange={handleFileChange}
            />

            <Button mt="xs" type="submit" loading={loading}>
              Save
            </Button>
          </form>
        </Box>
      </Group>
      <Footer>
        <Button onClick={handleLogout}>Sign Out</Button>
      </Footer>
    </PageContainer>
  );
}
