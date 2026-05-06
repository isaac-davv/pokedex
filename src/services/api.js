const BASE_URL = 'https://pokeapi.co/api/v2'

// Función reutilizable para fetch
const fetchData = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`)
  const data = await response.json()
  return data
}

// Obtener lista de los 151 pokémon
export const getPokemonList = async () => {
  const data = await fetchData('/pokemon?limit=151')
  return data.results
}

// Obtener detalle de un pokémon por nombre
export const getPokemonDetail = async (name) => {
  const data = await fetchData(`/pokemon/${name}`)
  return data
}

// Obtener lista de tipos
export const getPokemonTypes = async () => {
  const data = await fetchData('/type')
  return data.results
}

// Obtener pokémon por tipo
export const getPokemonByType = async (type) => {
  const data = await fetchData(`/type/${type}`)
  
  const gen1Pokemon = data.pokemon
    .filter((p) => {
      const id = parseInt(p.pokemon.url.split('/').filter(Boolean).pop())
      return id <= 151
    })
    .map((p) => p.pokemon)
  
  return gen1Pokemon
}