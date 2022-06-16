import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  height: 100px;
  background-image: linear-gradient(to top, #6006d6, #1526bd);
  display: flex;
  align-items: center;
  justify-content: space-around;
  p {
    font-size: 1.4rem;
    color: black;
    @media (max-width: 500px) {
      font-size: 1.1rem;
    }
  }
  a {
    position: relative;
    z-index: 2;
    color: black;
    font-size: 1.7rem;
    text-decoration: none;
    transition: color 1.3s linear;
    @media (max-width: 500px) {
      font-size: 1.1rem;
    }
    &:hover {
      color: #0dad95;
    }
  }
`;

export const Footer = () => {
  return (
    <FooterWrapper>
      <a href="tel:+7-977-777-77-77">+7-977-777-77-77</a>
      <p>BikeStories &#9400; 2021-2022</p>
    </FooterWrapper>
  );
};
