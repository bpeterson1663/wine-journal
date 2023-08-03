import Footer from 'components/footer/footer.component'
import { Header } from 'components/typography/typography.component'

export default function NotFound() {
  return (
    <main>
      <header>
        <Header variant="h2" text="Page Not Found" />
      </header>
      <Footer />
    </main>
  )
}
