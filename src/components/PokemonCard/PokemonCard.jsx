import { memo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPokemonDetail } from '../../services/api'
import './PokemonCard.css'

const PokemonCard = ({ name, url }) => {
  const [type, setType] = useState(null)
  
  const id = url.split('/').filter(Boolean).pop()
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  useEffect(() => {
    const fetchType = async () => {
      try {
        const data = await getPokemonDetail(name)
        console.log(name, data.types[0].type.name)
        setType(data.types[0].type.name)
      } catch (error) {
        console.error('Error fetching type:', error)
      }
    }
    fetchType()
  }, [name])

  return (
    <Link to={`/pokemon/${name}`} className={`pokemon-card ${type || 'loading'}`}>
      <span className="pokemon-id">#{id.padStart(3, '0')}</span>
      <img src={imageUrl} alt={name} className="pokemon-image" />
      <h3 className="pokemon-name">{name}</h3>
    </Link>
  )
}

export default memo(PokemonCard)