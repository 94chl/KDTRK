import styled from "@emotion/styled"
import React, {ChangeEvent} from 'react';
import useToggle from '../hooks/useToggle';

interface Props{
  on?:boolean;
  onChange?(e:ChangeEvent<HTMLInputElement>): void;
}

const Toggle = ({on=false, onChange, ...props}:Props) => {
  const [checked, toggle] = useToggle(on);

  const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
    toggle();
    onChange?.(e)
  }

  return (
    <ToggleContainer {...props}>
      <ToggleInput type="checkbox" onChange={handleChange} checked={checked}></ToggleInput>
      <ToggleSwitch></ToggleSwitch>
    </ToggleContainer>
  );
};

export default Toggle;

const ToggleContainer = styled.label`
display: inline-block;
cursor: pointer;
user-select:none;
`

const ToggleSwitch = styled.div`
width: 60px;
height: 25px;
padding: 2px;
background: #ccc;
cursor: pointer;
border:none;
border-radius:15px;
transition: background 0.2s ease-out;

  &:after {
    content: "";
    position: relative;
    left: 0;
    display: block;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #fff;
    transition: left 0.2s ease-out;
  }
`

const ToggleInput = styled.input`
  display: none;

  &:checked + div {
    background: lightgreen;
  }

  &:checked + div:after {
    left:calc(100% - 25px);
  }
`