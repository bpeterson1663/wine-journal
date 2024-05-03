import {
	Avatar,
	Button,
	FileInput,
	Group,
	TextInput,
	rem,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconUpload } from "@tabler/icons-react";
import Footer from "components/footer/footer.component";
import PageContainer from "components/page-container/page-container.component";
import { fetchLogout } from "features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "features/hooks";
import { editUserProfile } from "features/user/userSlice";
import styles from "pages/styles/pages.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	UserProfileSchema,
	type UserProfileT,
	defaultUserProfile,
} from "schemas/user";

export default function Profile() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { currentUser } = useAppSelector((state) => state.auth);
	const { userProfile } = useAppSelector((state) => state.user);
	const [fileValue, setValue] = useState<File | null>(null);

	const handleLogout = async () => {
		await dispatch(fetchLogout(null));
		if (!currentUser) {
			navigate("/");
		}
	};

	const onSubmitHandler = async (data: UserProfileT) => {
		try {
			await dispatch(editUserProfile(data));
			notifications.show({
				message: "Your profile was saved.",
			});
		} catch (err) {
			notifications.show({
				color: "red",
				message:
					"An error occurred trying to save your profile. Please try again later.",
			});
		}
	};

	const form = useForm({
		initialValues: {
			...defaultUserProfile,
			...userProfile,
			id: userProfile?.id ?? "",
			userId: currentUser?.uid ?? "",
			email: currentUser?.email ?? "",
		},
		validate: zodResolver(UserProfileSchema),
	});

	return (
		<PageContainer title="Profile">
			<section className={styles.container}>
				<Group className={styles.column}>
					<Avatar
						color="white"
						className={styles.avatar}
						radius="sm"
						size="xl"
					/>

					<form onSubmit={form.onSubmit(onSubmitHandler)}>
						<TextInput
							required
							type="firstName"
							label="First Name"
							{...form.getInputProps("firstName")}
						/>
						<TextInput
							required
							type="lastName"
							label="Last Name"
							{...form.getInputProps("lastName")}
						/>
						<TextInput
							type="email"
							label="Email"
							disabled
							{...form.getInputProps("email")}
						/>
						<TextInput
							type="displayName"
							label="Display Name"
							{...form.getInputProps("displayName")}
						/>
						<FileInput
							leftSection={
								<IconUpload style={{ width: rem(18), height: rem(18) }} />
							}
							placeholder="Upload avatar"
							value={fileValue}
							onChange={setValue}
						/>

						<Button type="submit">Save</Button>
					</form>
				</Group>
			</section>
			<Footer>
				<Button onClick={handleLogout}>Sign Out</Button>
			</Footer>
		</PageContainer>
	);
}
