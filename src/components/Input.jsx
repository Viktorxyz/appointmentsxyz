function Input({ onChange, placeholder, ...props }) {
  return (
    <label style={{ position: 'relative' }}>
      <input
        {...props}
        placeholder=""
        onChange={(e) => onChange(e.target.value)}
      />
      <span><p>{placeholder}</p></span>
    </label>
  )
}

export default Input;