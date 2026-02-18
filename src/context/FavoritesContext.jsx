/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react'

export const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('pokemonFavorites')
    return saved ? JSON.parse(saved) : []
  })

  // Guardar en localStorage cuando cambie favorites
  useEffect(() => {
    localStorage.setItem('pokemonFavorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (pokemon) => {
    setFavorites((prev) => [...prev, pokemon])
  }

  const removeFavorite = (name) => {
    setFavorites((prev) => prev.filter((p) => p.name !== name))
  }

  const isFavorite = (name) => {
    return favorites.some((p) => p.name === name)
  }

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      addFavorite, 
      removeFavorite, 
      isFavorite 
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}