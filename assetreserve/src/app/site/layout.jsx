
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'


export default function SiteLayout({ children }) {
  return (
    <>
      <Header />

      {children}

      <Footer />
    </>
  )
}