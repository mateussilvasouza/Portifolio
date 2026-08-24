import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/sections/Hero'
import { Impact } from '@/sections/Impact'
import { Thinking } from '@/sections/Thinking'
import { Cases } from '@/sections/Cases'
import { Toolkit } from '@/sections/Toolkit'
import { Experience } from '@/sections/Experience'
import { Contact } from '@/sections/Contact'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Impact />
        <Thinking />
        <Cases />
        <Toolkit />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
