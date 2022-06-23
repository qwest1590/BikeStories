import React, { ReactElement } from "react";

import styled from "styled-components";

const Btn = styled.button`
  z-index: 1;
  height: 45px;
  width: 90px;
  padding: 0px 10px 0px 10px;
  border: none;
  border-radius: 7px;
  color: white;
  background-color: ${(p) => p.color};
  cursor: pointer;
  font-size: 1.4rem;
  font-style: italic;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: box-shadow 0.2s linear;
  @media (max-width: 640px) {
    margin-right: 5px;
  }
  &:hover {
    box-shadow: inset 0 0 0 23px #14c74a;
  }
  &:focus {
    outline: 1px ridge #3a9ad6;
  }
`;

interface IBtnProps {
  name: string;
  color: string;
  onClick?(e: React.MouseEvent): void;
  children?: ReactElement;
  isLoading?: boolean;
}

export const Button = ({
  name,
  color,
  onClick,
  children,
  isLoading,
}: IBtnProps) => {
  return (
    <Btn
      color={color}
      onClick={onClick}
      style={isLoading ? { pointerEvents: "none" } : { pointerEvents: "all" }}
    >
      {isLoading ? children : name}
    </Btn>
  );
};
