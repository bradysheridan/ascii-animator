export default function ControlCharArray({
  label,
  name,
  tooltip,
  characters,
  onChange
}) {
  const updateChar = (i, val) => { characters[i] = val; onChange(Array.from(characters)); }
  const removeChar = (i) => { if (characters.length < 3) return; characters.splice(i, 1); onChange(Array.from(characters)); }
  const addChar = () => { characters.push(" "); onChange(Array.from(characters)); }

  return(
    <nav className="control control-text-sequence-wrap">
      <div className="flex">
        <label htmlFor={name}>
          <p>{label}</p>
        </label>
      </div>
      
      <div className="flex flex-wrap gap-1">
        {characters.map((val, i) => (
          <div key={`val-${Math.random()}`} className="flex border border-solid border-[black]">
            <input
              className="w-[20px] outline-0 border-0 text-center"
              type="text"
              maxLength={1}
              defaultValue={val}
              onChange={(e) => updateChar(i, e.target.value)}
              onFocus={(event) => event.target.select()}
            />

            <button
              className="rounded-none border-0 border-l border-solid border-[black] cursor-pointer hover:bg-[red]"
              onClick={() => removeChar(i)}
            >
              {"-"}
            </button>
          </div>
        ))}

        <button
          className="rounded-none border border-solid border-[black] cursor-pointer hover:bg-[green]"
          onClick={addChar}
        >
          {"+"}
        </button>
      </div>
    </nav>
  )
}