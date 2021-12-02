import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 16px;
`;

const Rail = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: #aaa;
`;

const Handle = styled.div`
  position: absolute;
  top: 8px;
  left: 0;
  width: 12px;
  height: 12px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid #44b;
  background: #fff;
  cursor: grab;
`;

const Track = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  width: 0;
  height: 4px;
  border-radius: 2px;
  background: #44b;
`;

const Slider = ({
  min = 0,
  max = 100,
  step = 0.1,
  defaultValue,
  onChange,
  ...props
}) => {
  const [dragging, setDragging] = useState(false);

  const [value, setValue] = useState(defaultValue ? defaultValue : min);

  const sliderRef = useRef(null);

  const handleMouseDown = useCallback(() => {
    setDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;
      const handleOffset = e.pageX - sliderRef.current.offsetLeft;
      const sliderWidth = sliderRef.current.offsetWidth;

      const track = handleOffset / sliderWidth;
      let newValue = min;

      if (track < 0) {
        newValue = min;
      } else if (track > 1) {
        newValue = max;
      } else {
        newValue = Math.round((min + (max - min) * track) / step) * step;
        newValue = Math.min(max, Math.max(min, newValue));
      }

      setValue(newValue);
      onChange && onChange(newValue);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [value, min, max, dragging, sliderRef, handleMouseUp, onChange, step]);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <SliderContainer ref={sliderRef} {...props}>
      <Rail />
      <Track style={{ width: `${percentage}%` }}></Track>
      <Handle
        onMouseDown={handleMouseDown}
        style={{ left: `${percentage}%` }}
      />
    </SliderContainer>
  );
};

Slider.propTypes = {};

export default Slider;
