import { Hero } from '@/sections/Hero'
import { Experience } from '@/sections/Experience'
import { Projects } from '@/sections/Projects'
import { Studying } from '@/sections/Studying'
import { Channel } from '@/sections/Channel'
import { Toolkit } from '@/sections/Toolkit'
import { Contact } from '@/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <Experience />
      <Projects />
      <Studying />
      <Channel />
      <Toolkit />
      <Contact />
    </main>
  )
}
