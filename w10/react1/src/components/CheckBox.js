import React from "react";

const CheckBox = React.memo(({ label, checked = false, onChange }) => {
  console.log(`render CheckBox ${label}`);
  const style = {
    backgroundColor: "cyan",
  };
  return (
    <label style={style}>
      {label}
      <input type="checkbox" defaultChecked={checked} onChange={onChange} />
    </label>
  );
});

export default CheckBox;
