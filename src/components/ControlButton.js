export default function ControlButton({
  value,
  onClick
}) {
  return(
    <nav className="control control-button">
      <button
        onClick={onClick}
      >
        {value}
      </button>
    </nav>
  )
}