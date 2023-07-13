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
          <div key={`range-${iRange}`} className="range">
            {range.map((fieldVal, iField) => (
              <span key={`range-${iRange}-field-${iField}`}>
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
                  value={fieldVal}
                  onChange={(e) => {
                    // parse as number if necessary
                    var val = (typeof fieldVal === 'number') ? parseFloat(e.target.value) : e.target.value;

                    // update value of this field
                    ranges[iRange][iField] = val;

                    // if changing the max value of a range and there's a range after this one,
                    // change the min value of the next range to match this range's max value
                    if (range.length === 3 && iField === 1 && ranges[iRange + 1] && ranges[iRange + 1].length === 3) {
                      ranges[iRange + 1][0] = val;
                    }

                    // if changing the min value of a range and there's a range before this one,
                    // change the max value of the last range to match this range's min value
                    if (range.length === 3 && iField === 0 && ranges[iRange - 1] && ranges[iRange - 1].length === 3) {
                      ranges[iRange - 1][1] = val;
                    }

                    onChange(structuredClone(ranges));
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