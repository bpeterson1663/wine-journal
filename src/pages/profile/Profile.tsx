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
import { uploadImage } from "database";
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
	const [blob, setBlob] = useState<Blob | null>(null);

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

	const handleLogout = async () => {
		await dispatch(fetchLogout(null));
		if (!currentUser) {
			navigate("/");
		}
	};

	const onSubmitHandler = async (data: UserProfileT) => {
		try {
			let avatar = data.avatar
			const response = await uploadImage(blob, "user", currentUser?.uid ?? "", 'jpg')
			avatar = response?.photoUrl ?? ""
			
			await dispatch(editUserProfile({...data, avatar}));

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

	

	const handleFileChange = (selectedFile: File | null) => {
		if (selectedFile) {
			setValue(selectedFile);
		  	const reader = new FileReader();
		  	reader.onload = (e: ProgressEvent<FileReader>) => {
				if (e.target && e.target.result) {
					const fileBlob = new Blob([e.target.result as ArrayBuffer], { type: selectedFile.type });
					setBlob(fileBlob);
				}
		  };
		  reader.readAsArrayBuffer(selectedFile);
		}
	};

	return (
		<PageContainer title="Profile">
			<section className={styles.container}>
				<Group className={styles.column}>
					<Avatar
						color="white"
						className={styles.avatar}
						radius="sm"
						size="xl"
						src={userProfile?.avatar}
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
							{...form.getInputProps("avatar")}
							placeholder="Upload avatar"
							value={fileValue}
							onChange={handleFileChange}
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
