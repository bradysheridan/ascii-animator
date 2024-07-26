export default function ControlButton({
  label,
  value,
  disabled,
  noMargin,
  onClick
}) {
  return(
    <nav className={`control control-button ${noMargin ? "no-margin" : ""}`}>
      {label && (
        <label>
          <p>{label}:</p>
        </label>
      )}

      <button
        disabled={disabled || false}
        onClick={onClick}
      >
        {value}
      </button>
    </nav>
  )
}