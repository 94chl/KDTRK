import React, { useState } from "react";
import Toast from "../../components/Toast";

export default {
  title: "Component/Toast",
  component: Toast,
};

export const Default = () => {
  return (
    <div>
      <button onClick={() => Toast.show("HELLO", 3000)}>Show Toast</button>
    </div>
  );
};
