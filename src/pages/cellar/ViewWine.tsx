import { Button, Group, Modal, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import Footer from "components/footer/footer.component";
import PageContainer from "components/page-container/page-container.component";
import { selectWineById } from "features/cellar/cellarSelectors";
import { deleteWine, wineSetEdit } from "features/cellar/cellarSlice";
import { useAppDispatch, useAppSelector } from "features/hooks";
import { tastingSetOpen } from "features/tasting/tastingSlice";
import styles from "pages/styles/pages.module.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { WineT } from "schemas/cellar";

export default function ViewWine() {
	const [opened, { open, close }] = useDisclosure(false);

	const params = useParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const id = params.id ?? "";
	const wine = useAppSelector(selectWineById(id));
	const [itemToDelete, setItemToDelete] = useState("");

	if (!wine) {
		navigate("/cellar");
		return null;
	}

	const handleConfirmDeleteOpen = (id: string) => {
		setItemToDelete(id);
		open();
	};

	const handleConfirmDeleteClose = () => {
		setItemToDelete("");
		close();
	};

	const handleDelete = async () => {
		try {
			await dispatch(deleteWine(itemToDelete)).unwrap();
			notifications.show({
				message: "Your wine was removed from cellar.",
			});
			navigate("/cellar");
		} catch (err) {
			console.error(err);
			notifications.show({
				color: "red",
				message: "Something went wrong removing your wine.",
			});
		}
	};

	const handleEditClick = (wine: WineT) => {
		dispatch(wineSetEdit(wine));
		navigate("/cellar/edit");
	};

	const handleOpenBottleClick = (wine: WineT) => {
		dispatch(tastingSetOpen(wine));
		navigate("/tastings/new");
	};

	const ConfirmDeleteDialog = () => (
		<Modal opened={opened} onClose={close} title="Delete Wine">
			<Text>Are you sure you want to delete this wine?</Text>
			<Group>
				<Button autoFocus onClick={handleConfirmDeleteClose}>
					Cancel
				</Button>
				<Button onClick={handleDelete} autoFocus>
					Delete
				</Button>
			</Group>
		</Modal>
	);

	const {
		producer,
		labelUri,
		varietal,
		vintage,
		region,
		country,
		subregion,
		classification,
	} = wine;

	return (
		<PageContainer title={producer} showBack>
			<section className={styles.container}>
				<div className={styles.column}>
					<img
						className={styles.wineImage}
						src={labelUri || require("images/wine-tasting.jpg")}
						alt={producer}
					/>
				</div>
				<div className={styles.column}>
					{producer && <Title order={6}>Winery: {producer}</Title>}
					{classification && <Title order={6}>Name: {classification}</Title>}
					<Text size="sm">Varietal(s): {varietal.join(", ")}</Text>
					<Text size="sm">Vintage: {vintage}</Text>
					<Text size="sm">Country: {country}</Text>

					<Text size="sm">Region: {region}</Text>
					{subregion && <Text size="sm">Subregion: {subregion}</Text>}
				</div>
			</section>
			<Footer>
				<Group style={{ width: "100%" }} justify="space-between">
					<Group>
						<Button
							onClick={() => {
								handleConfirmDeleteOpen(wine.id);
							}}
							variant="outline"
						>
							Delete
						</Button>
						<Button
							onClick={() => {
								handleEditClick(wine);
							}}
						>
							Edit
						</Button>
					</Group>
					<Group>
						<Button
							onClick={() => {
								handleOpenBottleClick(wine);
							}}
						>
							Open Bottle
						</Button>
					</Group>
				</Group>
			</Footer>
			<ConfirmDeleteDialog />
		</PageContainer>
	);
}
