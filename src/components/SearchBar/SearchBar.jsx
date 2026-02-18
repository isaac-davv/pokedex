import './SearchBar.css'

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="searchbar-input"
      />
    </div>
  )
}

export default SearchBar