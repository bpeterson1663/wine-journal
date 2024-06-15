import { ActionIcon, Avatar, Box, Button, FileInput, Group, TextInput, rem } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconTrash, IconUpload } from "@tabler/icons-react";
import Footer from "components/footer/footer.component";
import PageContainer from "components/page-container/page-container.component";
import { removeImage, uploadImage } from "database";
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
  const { file, blob, handleFileChange, imgPreview } = useFileInput();
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

  const handleDeleteAvatar = async () => {
    setLoading(true);
    try {
      await removeImage(form.values.avatar);
      await dispatch(editUserProfile({ ...form.values, avatar: "" })).unwrap();
      notifications.show({
        message: "Your avatar image has been removed.",
      });
    } catch (err: any) {
      notifications.show({
        message: "An error occurred removing your avatar.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (data: UserProfileT) => {
    setLoading(true);

    try {
      let avatar = data.avatar;
      if (data.imageBlob) {
        const { error, photoUrl } = await uploadImage(data.imageBlob, "user", currentUser?.uid ?? "");
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
      <Group justify="space-between" pl={10}>
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
            <Footer>
              <Group style={{ width: "100%" }} justify="space-between">
                <Button onClick={handleLogout}>Sign Out</Button>
                <Button type="submit" loading={loading}>
                  Save
                </Button>
              </Group>
            </Footer>
          </form>
        </Box>
        <Box mr="auto" ml="auto">
          <Avatar
            color="white"
            className={styles.avatar}
            radius="lg"
            size={isMobile ? 200 : 300}
            src={imgPreview || userProfile?.avatar}
          />
          <ActionIcon
            variant="filled"
            mt={10}
            size={36}
            loading={loading}
            disabled={!form.values.avatar}
            onClick={handleDeleteAvatar}
          >
            <IconTrash />
          </ActionIcon>
        </Box>
      </Group>
    </PageContainer>
  );
}
