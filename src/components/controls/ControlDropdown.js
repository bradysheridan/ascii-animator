import { useState } from 'react';

export default function Dropdown({ label, children, isExpandedByDefault }) {
  const [isExpanded, setIsExpanded] = useState(isExpandedByDefault ? isExpandedByDefault : false);

  return(
    <div className={`controls-dropdown ${isExpanded ? "expanded" : ""}`}>
      <div className="controls-dropdown-label" onClick={() => setIsExpanded(!isExpanded)}>
        <h6>{label}</h6>

        <i className="ri-arrow-right-s-line"></i>
      </div>

      <div className="controls-dropdown-children">
        {children}
      </div>
    </div>
  )
}