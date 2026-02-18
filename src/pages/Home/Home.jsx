import { useState, useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { getPokemonList, getPokemonTypes, getPokemonByType } from '../../services/api'
import PokemonCard from '../../components/PokemonCard/PokemonCard'
import Loading from '../../components/Loading/Loading'
import SearchBar from '../../components/SearchBar/SearchBar'
import TypeFilter from '../../components/TypeFilter/TypeFilter'
import './Home.css'

const Home = () => {
  const { data: allPokemon, isLoading: loadingPokemon } = useFetch(getPokemonList)
  const { data: types, isLoading: loadingTypes } = useFetch(getPokemonTypes)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [pokemonList, setPokemonList] = useState([])
  const [loadingFilter, setLoadingFilter] = useState(false)

  // Cuando cambia el tipo seleccionado
  useEffect(() => {
    const fetchByType = async () => {
      if (selectedType === '') {
        setPokemonList(allPokemon || [])
      } else {
        setLoadingFilter(true)
        const filtered = await getPokemonByType(selectedType)
        setPokemonList(filtered)
        setLoadingFilter(false)
      }
    }

    if (allPokemon) {
      fetchByType()
    }
  }, [selectedType, allPokemon])

  if (loadingPokemon || loadingTypes) return <Loading />

  // Filtrar por búsqueda
  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.includes(searchTerm.toLowerCase())
  )

  return (
    <main className="home">
      <h1 className="home-title">Pokédex</h1>
      
      <div className="filters">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <TypeFilter 
          types={types} 
          selectedType={selectedType} 
          onChange={setSelectedType} 
        />
      </div>

      {loadingFilter ? (
        <Loading />
      ) : (
        <>
          <div className="pokemon-grid">
            {filteredPokemon.map((pokemon) => (
              <PokemonCard 
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>

          {filteredPokemon.length === 0 && (
            <p className="no-results">No se encontraron Pokémon</p>
          )}
        </>
      )}
    </main>
  )
}

export default Home