import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/sections/Hero'
import { Impact } from '@/sections/Impact'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Impact />
      </main>
      <Footer />
    </>
  )
}

export default App
