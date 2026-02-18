import { useContext } from 'react'
import { FavoritesContext } from '../../context/FavoritesContext'
import PokemonCard from '../../components/PokemonCard/PokemonCard'
import './Favorites.css'


const Favorites = () => {
  const { favorites } = useContext(FavoritesContext)

  return (
    <main className="favorites">
      <h1 className="favorites-title">Mis Favoritos</h1>

      {favorites.length === 0 ? (
        <div className="no-favorites">
          <p>No tienes Pokémon favoritos todavía</p>
          <span>❤️</span>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((pokemon) => (
            <PokemonCard 
              key={pokemon.name}
              name={pokemon.name}
              url={pokemon.url}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default Favorites