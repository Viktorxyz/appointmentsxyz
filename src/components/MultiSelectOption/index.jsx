function MultiSelectOption({ children, option, isSelected, onSelect }) {
  return (
    <label>
      <input type="checkbox" checked={isSelected} onChange={() => onSelect(option)} />
      {children}
    </label>
  )
}

export default MultiSelectOption