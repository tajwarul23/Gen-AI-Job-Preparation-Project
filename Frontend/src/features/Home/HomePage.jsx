
import Features from './Features'
import Footer from './Footer'
import Hero from './Hero'
import LastBanner from './LastBanner'
import PrevReportBanner from './PrevReportBanner'
import ResumeBanner from './ResumeBanner'

const HomePage = () => {
  return (
    <div className="relative min-h-screen max-w-7xl mx-auto overflow-x-hidden">
        <Hero/>
        <Features/>
        <ResumeBanner/>
        <PrevReportBanner/>
        <LastBanner/>
        <Footer/>
    </div>
  )
}

export default HomePage