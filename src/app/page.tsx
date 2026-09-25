import { Hero } from '@/sections/Hero'
import { Impact } from '@/sections/Impact'
import { Thinking } from '@/sections/Thinking'
import { Projects } from '@/sections/Projects'
import { Toolkit } from '@/sections/Toolkit'
import { Experience } from '@/sections/Experience'
import { Contact } from '@/sections/Contact'
import { Blog } from '@/sections/Blog'

export default function Home() {
  return (
    <main>
      <Hero />
      <Impact />
      <Thinking />
      <Projects />
      <Toolkit />
      <Experience />
      <Contact />
      <Blog />
    </main>
  )
}
