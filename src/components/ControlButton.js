export default function ControlButton({
  label,
  value,
  onClick
}) {
  return(
    <nav className="control control-button">
      <label>
        <p>{label}:</p>
      </label>

      <button
        onClick={onClick}
      >
        {value}
      </button>
    </nav>
  )
}