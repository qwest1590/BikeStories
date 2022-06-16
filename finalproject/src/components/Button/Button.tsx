import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Btn = styled.button`
  z-index: 1;
  min-width: 85px;
  height: 45px;
  padding: 0px 10px 0px 10px;
  border: none;
  border-radius: 7px;
  color: white;
  background-color: ${(p) => p.color};
  cursor: pointer;
  font-size: 1.4rem;
  font-style: italic;
  font-weight: 500;
  transition: box-shadow 0.5s linear;
  &:hover {
    box-shadow: inset 0 0 0 23px #14c74a;
  }
  &:focus {
    outline: 2px ridge #3a9ad6;
  }
`;

interface IBtnProps {
  name: string;
  color: string;
}

export const Button = ({ name, color }: IBtnProps) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/login");
  };
  return (
    <Btn color={color} onClick={onClickHandler}>
      {name}
    </Btn>
  );
};
