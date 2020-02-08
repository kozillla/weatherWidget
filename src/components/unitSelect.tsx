import React from "react";

interface MyProps {
  onUnitChange: (event: any) => void;
}
export function UnitSelect(props: MyProps) {
  return (
    <div className="menuHeaderRow bottom">
      <label htmlFor="favcity">Unit Type : </label>
      <select id="favcity" name="select" onChange={props.onUnitChange}>
        <option value={1}>Metric</option>
        <option value={2}>Imperial</option>
      </select>
    </div>
  );
}
