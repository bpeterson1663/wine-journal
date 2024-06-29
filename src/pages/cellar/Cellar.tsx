import { Button, Group } from "@mantine/core";
import { Card } from "components/card/card.component";
import Footer from "components/footer/footer.component";
import PageContainer from "components/page-container/page-container.component";
import { selectAllWines } from "features/cellar/cellarSelectors";
import { useAppSelector } from "features/hooks";
import { useViewMore } from "hooks/useViewMore";
import styles from "pages/styles/pages.module.css";
import { useNavigate } from "react-router-dom";

export default function Cellar() {
  const wineList = useAppSelector(selectAllWines);
  const { viewable, handleShowMore, moreAvailable } = useViewMore(wineList);

  const navigate = useNavigate();

  const handleNewWine = () => {
    navigate("/cellar/new");
  };

  return (
    <PageContainer showBack title="Cellar">
      <section className={styles.list}>
        {viewable.map((wine) => (
          <Card key={wine.id} wine={wine} url="cellar" />
        ))}
      </section>
      <div className={styles["load-more-container"]}>
        <Button disabled={!moreAvailable} variant="outline" onClick={() => handleShowMore(viewable.length)}>
          Show More
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
