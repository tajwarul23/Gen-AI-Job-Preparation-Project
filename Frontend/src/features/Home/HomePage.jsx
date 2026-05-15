
import Features from './Features'
import Hero from './Hero'
import ResumeBanner from './ResumeBanner'

const HomePage = () => {
  return (
    <div className="relative min-h-screen max-w-7xl mx-auto overflow-x-hidden">
        <Hero/>
        <Features/>
        <ResumeBanner/>
    </div>
  )
}

export default HomePage