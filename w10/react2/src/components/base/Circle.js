import React from "react";

const Box = React.memo(({ width, height, backgroundColor }) => {
  console.log("render Box");
  const style = {
    width: width || 100,
    height: height || 100,
    backgroundColor: backgroundColor || "orange",
    borderRadius: "50%",
  };
  return <div style={style}></div>;
});

export default Box;
