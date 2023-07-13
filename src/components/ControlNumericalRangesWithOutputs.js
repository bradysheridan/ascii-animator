export default function ControlNumericalRangesWithOutputs({
  label,
  name,
  ranges,
  onChange
}) {
  return(
    <nav className="control control-numerical-ranges-with-outputs-wrap">
      <label htmlFor={name}>
        <p>{label}</p>
      </label>

      {
        ranges.map((range, iRange) => (
          <div className="range">
            {range.map((fieldVal, iField) => (
              <span>
                <label>
                  {
                    range.length === 3
                      ? iField === 0 
                        ? "Min"
                      : iField === 1
                        ? "Max"
                      : iField === 2
                        ? "Char"
                      : range.length === 1
                        ? "Char"
                        : null
                      : "Char"
                    }
                </label>

                <input
                  style={{width: '25%'}}
                  type={typeof fieldVal}
                  defaultValue={fieldVal}
                  onChange={(e) => {
                    console.log("ControlNumericalRangesWithOutputs received changed input value...");
                    console.log("> e.target.value", e.target.value);
                    console.log("> iRange", iRange);
                    console.log("> iField", iField);
                    ranges[iRange][iField] = (typeof fieldVal === 'number') ? parseInt(e.target.value) : e.target.value;
                    onChange(ranges);
                  }}
                />
              </span>
            ))}
          </div>
        ))
      }
    </nav>
  )
}