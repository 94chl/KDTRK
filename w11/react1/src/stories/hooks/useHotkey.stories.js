import { Fragment, useState } from "react";
import useHotkey from "../../hooks/useHotkey";

export default {
  title: "Hook/useHotkey",
};

export const Default = () => {
  const [value, setValue] = useState("");
  const hotkeys = [
    {
      global: true,
      combo: "alt+k",
      onKeyDown: (e) => {
        alert("alt+k");
      },
    },
    {
      combo: "esc",
      onKeyDown: (e) => {
        setValue("");
      },
    },
  ];

  const { handleKeyDown } = useHotkey(hotkeys);

  return (
    <div>
      <div>useHotkey 테스트</div>
      <div>meta + k / esc</div>
      <input
        onKeyDown={handleKeyDown}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
