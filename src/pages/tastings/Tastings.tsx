import { Button, Group, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { Card } from "components/card/card.component";
import Footer from "components/footer/footer.component";
import PageContainer from "components/page-container/page-container.component";
import { useAppDispatch, useAppSelector } from "features/hooks";
import { fetchTastings } from "features/tasting/tastingSlice";
import styles from "pages/styles/pages.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Tastings() {
  const dispatch = useAppDispatch();
  const [disableLoadMore, setDisableLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currentUser } = useAppSelector((state) => state.auth);
  const { tastingList } = useAppSelector((state) => state.tasting);
  const navigate = useNavigate();

  const handleNewTasting = () => {
    navigate("/tastings/new");
  };

  const handleNext = async (lastId: string) => {
    setLoading(true);
    try {
      const { docs } = await dispatch(fetchTastings({ userId: currentUser?.uid ?? "", previousDoc: lastId })).unwrap();
      if (docs.length < 10) {
        setDisableLoadMore(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sortedList = [...tastingList].sort((a, b) => b.date.toISOString().localeCompare(a.date.toISOString()));

  const handleSearch = () => {
    console.log({ search });
  };

  return (
    <PageContainer title="Tastings">
      <Group justify="flex-end">
        <TextInput placeholder="Search" onChange={(e) => setSearch(e.target.value)} leftSection={<IconSearch />} />
        <Button onClick={handleSearch}>Search</Button>
      </Group>

      <section className={styles.list}>
        {sortedList.map((tasting) => (
          <Card key={tasting.id} wine={tasting} url="tastings" showDate />
        ))}
      </section>
      <div className={styles["load-more-container"]}>
        <Button
          disabled={disableLoadMore}
          loading={loading}
          variant="outline"
          onClick={() => handleNext(sortedList[sortedList.length - 1].id)}
        >
          Load More
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
