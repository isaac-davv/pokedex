import './TypeBadge.css'

const TypeBadge = ({ type }) => {
  return (
    <span className={`type-badge ${type}`}>
      {type}
    </span>
  )
}

export default TypeBadge