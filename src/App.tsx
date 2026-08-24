import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/sections/Hero'
import { Impact } from '@/sections/Impact'
import { Thinking } from '@/sections/Thinking'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Impact />
        <Thinking />
      </main>
      <Footer />
    </>
  )
}

export default App
