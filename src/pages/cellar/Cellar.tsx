import { Button, Group } from "@mantine/core";
import { Card } from "components/card/card.component";
import Footer from "components/footer/footer.component";
import PageContainer from "components/page-container/page-container.component";
import { fetchWines } from "features/cellar/cellarSlice";
import { useAppDispatch, useAppSelector } from "features/hooks";
import styles from "pages/styles/pages.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cellar() {
	const dispatch = useAppDispatch();
	const [disableLoadMore, setDisableLoadMore] = useState(false);
	const [loading, setLoading] = useState(false)
	const { wineList } = useAppSelector((state) => state.cellar);
	const { currentUser } = useAppSelector((state) => state.auth);

	const navigate = useNavigate();

	const handleNewWine = () => {
		navigate("/cellar/new");
	};

	const handleNext = async (lastId: string) => {
		setLoading(true)
		try {
			const { docs } = await dispatch(
				fetchWines({ userId: currentUser?.uid ?? "", previousDoc: lastId }),
			).unwrap();
			if (docs.length < 10) {
				setDisableLoadMore(true);
			}
		} catch(err) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	};

	return (
		<PageContainer title="Cellar">
			<section className={styles.list}>
				{wineList.map((wine) => (
					<Card key={wine.id} wine={wine} url="cellar" />
				))}
			</section>
			<div className={styles["load-more-container"]}>
				<Button
					disabled={disableLoadMore}
					loading={loading}
					variant="outline"
					onClick={() => handleNext(wineList[wineList.length - 1].id)}
				>
					Load More
				</Button>
			</div>
			<Footer>
				<Group justify="flex-end">
					<Button
						onClick={() => {
							handleNewWine();
						}}
					>
						Add Wine
					</Button>
				</Group>
			</Footer>
		</PageContainer>
	);
}
