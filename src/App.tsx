import './App.css'
import MarketingSection from './components/ui/MarketingSection'
import Hero from './components/ui/Hero'
import Gallery from './components/ui/Gallery'
import TrendingPairs from './components/ui/TrendingPairs'
import ChainTVL from './components/ui/ChainTVL'
import SolanaDeFi from './components/ui/SolanaDeFi'

function App() {
  return (
    <>
      <Hero />
      <MarketingSection />
      <TrendingPairs />
      <ChainTVL />
      <SolanaDeFi />
      <Gallery />
    </>
  )
}

export default App
