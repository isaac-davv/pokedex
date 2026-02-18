const BASE_URL = 'https://pokeapi.co/api/v2'

// Obtener lista de los 151 pokémon
export const getPokemonList = async () => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=151`)
  const data = await response.json()
  return data.results
}

// Obtener detalle de un pokémon por nombre
export const getPokemonDetail = async (name) => {
  const response = await fetch(`${BASE_URL}/pokemon/${name}`)
  const data = await response.json()
  return data
}

// Obtener lista de tipos
export const getPokemonTypes = async () => {
  const response = await fetch(`${BASE_URL}/type`)
  const data = await response.json()
  return data.results
}

// Obtener pokémon por tipo
export const getPokemonByType = async (type) => {
  const response = await fetch(`${BASE_URL}/type/${type}`)
  const data = await response.json()
  
  // Filtrar solo los primeros 151 (Gen 1)
  const gen1Pokemon = data.pokemon
    .filter((p) => {
      const id = parseInt(p.pokemon.url.split('/').filter(Boolean).pop())
      return id <= 151
    })
    .map((p) => p.pokemon)
  
  return gen1Pokemon
}