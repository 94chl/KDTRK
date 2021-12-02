import styled from "@emotion/styled";
import ImageComponent from "../Image";
import { useEffect, useRef, useState } from "react";
import AvatarGroup from "./AvatarGroup";

const ShapeToCssValue = {
  circle: "50%",
  round: "4px",
  square: "0px",
};

const AvatarWrapper = styled.div`
  display: inline-block;
  overflow: hidden;
  position: relative;
  border: 1px solid #ddd;
  border-radius: ${({ shape }) => ShapeToCssValue[shape]};
  background: #eee;

  > img {
    transition: opacity 0.2s ease-out;
  }
`;

const Avatar = ({
  lazy,
  threshold,
  src,
  size = 70,
  shape = "circle",
  placeholder,
  alt,
  mode = "dover",
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setLoaded(true);
  }, [src]);

  return (
    <AvatarWrapper {...props} shape={shape}>
      <ImageComponent
        block
        lazy={lazy}
        threshold={threshold}
        src={src}
        size={size}
        shape={shape}
        placeholder={placeholder}
        alt={alt}
        mode={mode}
        style={{ opacity: loaded ? 1 : 0 }}
      ></ImageComponent>
    </AvatarWrapper>
  );
};

Avatar.propTypes = {};

Avatar.Group = AvatarGroup;

export default Avatar;
