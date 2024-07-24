import { Button, Group, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { Card } from "components/card/card.component";
import Footer from "components/footer/footer.component";
import PageContainer from "components/page-container/page-container.component";
import { useAppSelector } from "features/hooks";
import { selectUserPlan } from "features/plan/planSelector";
import { selectAllTastings } from "features/tasting/tastingSelectors";
import { useViewMore } from "hooks/useViewMore";
import styles from "pages/styles/pages.module.css";
import { useNavigate } from "react-router-dom";

export default function Tastings() {
  const tastingList = useAppSelector(selectAllTastings);
  const { viewable, handleShowMore, moreAvailable, setSearch, search } = useViewMore(tastingList);
  const navigate = useNavigate();
  const currentPlan = useAppSelector(selectUserPlan);

  return (
    <PageContainer showBack title="Tastings">
      <Group justify="flex-end">
        <TextInput placeholder="Search" onChange={(e) => setSearch(e.target.value)} leftSection={<IconSearch />} />
      </Group>

      <section className={styles.list}>
        {viewable.map((tasting) => (
          <Card key={tasting.id} wine={tasting} url="tastings" showDate />
        ))}
      </section>

      {search === "" && (
        <div className={styles["load-more-container"]}>
          <Button disabled={!moreAvailable} variant="outline" onClick={() => handleShowMore(viewable.length)}>
            Show More
          </Button>
        </div>
      )}
      <Footer>
        <Group justify="flex-end">
          <Button
            style={{ margin: "0 5px " }}
            disabled={typeof currentPlan.maxTasting === "number" && tastingList.length >= currentPlan.maxTasting}
            onClick={() => {
              navigate("/tastings/new");
            }}
          >
            New Tasting
          </Button>
        </Group>
      </Footer>
    </PageContainer>
  );
}
