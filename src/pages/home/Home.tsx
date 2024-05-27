import { Button, Group, Stack, Title } from "@mantine/core";
import { Card } from "components/card/card.component";
import Footer from "components/footer/footer.component";
import PageContainer from "components/page-container/page-container.component";
import { useAppSelector } from "features/hooks";
import styles from "pages/styles/pages.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { tastingList } = useAppSelector((state) => state.tasting);
  const { publicTastingList } = useAppSelector((state) => state.tasting);
  const { wineList } = useAppSelector((state) => state.cellar);

  const sortedTastingList = [...tastingList].sort((a, b) => b.date.toISOString().localeCompare(a.date.toISOString()));
  const sortedPublicList = [...publicTastingList].sort((a, b) =>
    b.date.toISOString().localeCompare(a.date.toISOString()),
  );

  return (
    <PageContainer title="Welcome">
      <Stack>
        {sortedPublicList.length > 0 && (
          <Group>
            <Title order={4}>What people are tasting</Title>
            <section className={styles["preview-list"]}>
              {sortedPublicList.map((tasting) => (
                <Card key={tasting.id} wine={tasting} url="tastings" showDate />
              ))}
            </section>
          </Group>
        )}
        <Group pl={20} pr={20}>
          <Group justify="space-between" w="100%">
            <Title order={4}>Your tastings</Title>
            <Button variant="outline" size="xs" onClick={() => navigate("/Tastings")}>
              View All
            </Button>
          </Group>

          <section className={styles["preview-list"]}>
            {sortedTastingList.map((tasting) => (
              <Card key={tasting.id} wine={tasting} url="tastings" showDate />
            ))}
          </section>
        </Group>

        <Group pl={20} pr={20}>
          <Group justify="space-between" w="100%">
            <Title order={4}>Your cellar</Title>
            <Button variant="outline" size="xs" onClick={() => navigate("/cellar")}>
              View All
            </Button>
          </Group>
          <section className={styles["preview-list"]}>
            {wineList.map((wine) => (
              <Card key={wine.id} wine={wine} url="cellar" />
            ))}
          </section>
        </Group>
      </Stack>
      <Footer>
        <Group justify="flex-end">
          <Button onClick={() => navigate("/tastings/new")}>Add Tasting</Button>
          <Button onClick={() => navigate("/cellar/new")}>Add Wine</Button>
        </Group>
      </Footer>
    </PageContainer>
  );
}
