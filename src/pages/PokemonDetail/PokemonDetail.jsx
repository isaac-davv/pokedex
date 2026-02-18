import { useParams, Link } from 'react-router-dom'
import { useContext } from 'react'
import { FavoritesContext } from '../../context/FavoritesContext'
import useFetch from '../../hooks/useFetch'
import { getPokemonDetail } from '../../services/api'
import Loading from '../../components/Loading/Loading'
import TypeBadge from '../../components/TypeBadge/TypeBadge'
import './PokemonDetail.css'

const PokemonDetail = () => {
  const { name } = useParams()
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext)
  
  const { data: pokemon, isLoading, error } = useFetch(
    () => getPokemonDetail(name),
    [name]
  )

  if (isLoading) return <Loading />
  if (error) return <p className="error">Error: {error}</p>

  const imageUrl = pokemon.sprites.other['official-artwork'].front_default
  const favorite = isFavorite(pokemon.name)
  const mainType = pokemon.types[0].type.name

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(pokemon.name)
    } else {
      addFavorite({
        name: pokemon.name,
        url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`
      })
    }
  }

  return (
    <main className="pokemon-detail">
      <Link to="/" className="back-button">← Volver</Link>

      <div className={`detail-card ${mainType}`}>
        <div className="detail-header">
          <span className="detail-id">#{String(pokemon.id).padStart(3, '0')}</span>
          <h1 className="detail-name">{pokemon.name}</h1>
          <div className="detail-types">
            {pokemon.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </div>
        </div>

        <button 
          className={`favorite-button ${favorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
        >
          {favorite ? '❤️ Quitar de favoritos' : '🤍 Añadir a favoritos'}
        </button>

        <img src={imageUrl} alt={pokemon.name} className="detail-image" />

        <div className="detail-info">
          <div className="info-item">
            <span className="info-label">Altura</span>
            <span className="info-value">{pokemon.height / 10} m</span>
          </div>
          <div className="info-item">
            <span className="info-label">Peso</span>
            <span className="info-value">{pokemon.weight / 10} kg</span>
          </div>
        </div>

        <div className="detail-stats">
          <h2>Estadísticas</h2>
          {pokemon.stats.map((stat) => (
            <div key={stat.stat.name} className="stat-row">
              <span className="stat-name">{stat.stat.name}</span>
              <div className="stat-bar">
                <div 
                  className="stat-fill" 
                  style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                ></div>
              </div>
              <span className="stat-value">{stat.base_stat}</span>
            </div>
          ))}
        </div>

        <div className="detail-abilities">
          <h2>Habilidades</h2>
          <div className="abilities-list">
            {pokemon.abilities.map((a) => (
              <span key={a.ability.name} className="ability">
                {a.ability.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default PokemonDetail