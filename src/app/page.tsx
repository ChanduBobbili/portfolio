import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SpaceBackground } from '@/components/ui/SpaceBackground'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { WorkExperience } from '@/components/sections/WorkExperience'
import { Skills } from '@/components/sections/Skills'
import { TechnicalWriting } from '@/components/sections/TechnicalWriting'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <SpaceBackground />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Projects />
        <WorkExperience />
        <Skills />
        <TechnicalWriting />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
