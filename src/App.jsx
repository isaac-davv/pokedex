import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import PokemonDetail from './pages/PokemonDetail/PokemonDetail'
import Favorites from './pages/Favorites/Favorites'
import Contact from './pages/Contact/Contact'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pokemon/:name' element={<PokemonDetail />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App