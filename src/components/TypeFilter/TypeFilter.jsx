import './TypeFilter.css'

const TypeFilter = ({ types, selectedType, onChange }) => {
  return (
    <div className="type-filter">
      <select
        value={selectedType}
        onChange={(e) => onChange(e.target.value)}
        className="type-select"
      >
        <option value="">Todos los tipos</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default TypeFilter