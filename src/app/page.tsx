import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { WorkExperience } from '@/components/sections/WorkExperience'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { TechnicalWriting } from '@/components/sections/TechnicalWriting'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <WorkExperience />
        <TechnicalWriting />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
