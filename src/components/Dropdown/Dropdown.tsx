import React, { useState } from "react";
import styled from "styled-components";

const DropdownLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 560px;
  height: 30px;
  margin-top: 8px;
  border-radius: 5px;
  border: none;
  -webkit-filter: drop-shadow(0.5rem 0.2rem 0.4rem #58a9db);
  filter: drop-shadow(0.5rem 0.2rem 0.4rem #58a9db);
  background-color: white;
  padding: 1px 2px 1px 15px;
  font-size: 1.2rem;
  &:hover {
    color: #3a9ad6;
    cursor: pointer;
  }
  @media (max-width: 640px) {
    width: 315px;
  }
`;

const DropdownArrow = styled.div``;

const DropdownItem = styled(DropdownLabel)`
  margin-top: 0px;
  border-radius: 0px;
  &:hover {
    cursor: pointer;
    background-color: #3a9ad6;
    color: black;
  }
`;

const OptionsList = styled.ul`
  list-style: none;
  position: absolute;
  z-index: 3;
`;

interface IDropdownOptions {
  options: string[];
  label: string;
  description: string;
  onChange(value: string): void;
}

export const Dropdown = ({
  options,
  label,
  description,
  onChange,
}: IDropdownOptions) => {
  const [dropdown, setDropdown] = useState({
    isOpen: false,
    labelText: label,
  });
  return (
    <>
      {" "}
      <p style={{ fontSize: "1.2rem", paddingTop: "20px" }}>{description}</p>
      <div>
        <DropdownLabel
          onClick={() =>
            setDropdown((p) => ({ ...p, isOpen: !dropdown.isOpen }))
          }
        >
          <span>{dropdown.labelText}</span>
          <DropdownArrow>&#9660;</DropdownArrow>
        </DropdownLabel>
        <OptionsList>
          {dropdown.isOpen
            ? options.map((item) => (
                <li key={item}>
                  <DropdownItem
                    onClick={(e) => {
                      Array.isArray(item)
                        ? onChange(item[1])
                        : onChange(e.currentTarget.innerText.toLowerCase());
                      setDropdown({
                        isOpen: false,
                        labelText: e.currentTarget.innerText,
                      });
                    }}
                  >
                    {Array.isArray(item) ? item[0] : item}
                  </DropdownItem>
                </li>
              ))
            : null}
        </OptionsList>
      </div>
    </>
  );
};
