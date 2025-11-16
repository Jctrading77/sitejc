import './App.css'
import MarketingSection from './components/ui/MarketingSection'
import Hero from './components/ui/Hero'
import Gallery from './components/ui/Gallery'
import TrendingPairs from './components/ui/TrendingPairs'
import ChainTVL from './components/ui/ChainTVL'

function App() {
  return (
    <>
      <Hero />
      <MarketingSection />
      <TrendingPairs />
      <ChainTVL />
      <Gallery />
    </>
  )
}

export default App
