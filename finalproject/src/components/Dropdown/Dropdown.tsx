import React, { useState } from "react";
import styled from "styled-components";

const DropdownLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
    width: 335px;
  }
`;

const DropdownArrow = styled.div`
  transform: rotate(90deg);
  position: absolute;
  right: 20px;
`;

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
}

export const Dropdown = (props: IDropdownOptions) => {
  const [dropdown, setDropdown] = useState({
    isOpen: false,
    labelText: props.label,
  });
  return (
    <>
      {" "}
      <p style={{ fontSize: "1.2rem", paddingTop: "20px" }}>
        {props.description}
      </p>
      <div>
        <DropdownLabel
          onClick={() =>
            setDropdown((p) => ({ ...p, isOpen: !dropdown.isOpen }))
          }
        >
          <span>{dropdown.labelText}</span>
          <DropdownArrow>&#10148;</DropdownArrow>
        </DropdownLabel>
        <OptionsList>
          {dropdown.isOpen
            ? props.options.map((item) => (
                <li key={item}>
                  <DropdownItem
                    onClick={(e) =>
                      setDropdown({
                        isOpen: false,
                        labelText: e.currentTarget.innerText,
                      })
                    }
                  >
                    {item}
                  </DropdownItem>
                </li>
              ))
            : null}
        </OptionsList>
      </div>
    </>
  );
};
