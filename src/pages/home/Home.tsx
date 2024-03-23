import PageContainer from "components/page-container/page-container.component";
import Footer from "components/footer/footer.component";
import { Stack, Group, Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from 'features/hooks'
import { Card } from 'components/card/card.component'
import styles from 'pages/styles/pages.module.css'

export default function Home() {
    const navigate = useNavigate()
    const { tastingList } = useAppSelector((state) => state.tasting)
    const { publicTastingList } = useAppSelector((state) => state.tasting)
    const { wineList } = useAppSelector((state) => state.cellar)

    const sortedTastingList = [...tastingList]
      .sort((a, b) => b.date.toISOString().localeCompare(a.date.toISOString()))
    const sortedPublicList = [...publicTastingList]
        .sort((a, b) => b.date.toISOString().localeCompare(a.date.toISOString()))

    return (
        <PageContainer title="Welcome">
            <Stack>
                {sortedPublicList.length > 0 && 
                <Group>
                    <Text>What people are tasting</Text>
                    <section className={styles['preview-list']}>
                        {sortedPublicList
                            .map((tasting) => (
                                <Card key={tasting.id} wine={tasting} url="tastings" showDate />
                            ))
                        } 
                    </section>
                </Group>
                }
                <Group>
                    <Text>Your tastings</Text>
                    <section className={styles['preview-list']}>
                        {sortedTastingList
                            .map((tasting) => (
                                <Card key={tasting.id} wine={tasting} url="tastings" showDate />
                            ))
                        } 
                    </section>
                    <Button onClick={() => navigate('/Tastings')}>View All</Button>
                </Group>
                
                <Group>
                    <Text>Your cellar</Text>
                    <section className={styles['preview-list']}>
                        {wineList.map((wine) => (
                        <Card key={wine.id} wine={wine} url="cellar" />
                        ))}
                    </section>
                    <Button onClick={() => navigate('/cellar')}>View All</Button>
                </Group>
                
            </Stack>
            <Footer>
                <Group justify="flex-end">
                <Button onClick={() => navigate("/tastings/new")}>
                    Add Tasting
                </Button>
                <Button onClick={() => navigate("/cellar/new")}>
                    Add Wine
                </Button>
                </Group>
            </Footer>
        </PageContainer>
    )
}