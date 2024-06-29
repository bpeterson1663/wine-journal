import { Button, Group, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { Card } from "components/card/card.component";
import Footer from "components/footer/footer.component";
import PageContainer from "components/page-container/page-container.component";
import { useAppSelector } from "features/hooks";
import { selectAllTastings } from "features/tasting/tastingSelectors";
import { useViewMore } from "hooks/useViewMore";
import styles from "pages/styles/pages.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Tastings() {
  const [search, setSearch] = useState("");
  const tastingList = useAppSelector(selectAllTastings);
  const { viewable, handleShowMore, moreAvailable } = useViewMore(tastingList);
  const navigate = useNavigate();

  const handleNewTasting = () => {
    navigate("/tastings/new");
  };

  const handleSearch = () => {
    console.log({ search });
  };

  return (
    <PageContainer showBack title="Tastings">
      <Group justify="flex-end">
        <TextInput placeholder="Search" onChange={(e) => setSearch(e.target.value)} leftSection={<IconSearch />} />
        <Button onClick={handleSearch}>Search</Button>
      </Group>

      <section className={styles.list}>
        {viewable.map((tasting) => (
          <Card key={tasting.id} wine={tasting} url="tastings" showDate />
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
            style={{ margin: "0 5px " }}
            onClick={() => {
              handleNewTasting();
            }}
          >
            New Tasting
          </Button>
        </Group>
      </Footer>
    </PageContainer>
  );
}
