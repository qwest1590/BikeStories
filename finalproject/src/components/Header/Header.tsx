import React from "react";
import styled from "styled-components";
import { Button } from "../Button/Button";
import logo from "../../images/logo.jpg";
import { Link } from "react-router-dom";

const HeaderWrapper = styled.div`
  height: 100px;
  background-color: #3a9ad6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const CompanyName = styled.span`
  font-family: fantasy;
  font-size: 2.5rem;
  background: linear-gradient(to right, #1526bd 0%, #c616cc 50%, #6006d6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 500px) {
    font-size: 1.5rem;
  }
`;

const Logo = styled.div`
  padding-left: 10px;
  height: 70px;
  min-width: 90px;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
`;

const LogAndRegWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
`;

const RegSpan = styled.span`
  padding-top: 10px;
  font-style: italic;
  font-size: 1.2rem;
  font-weight: 500;
  z-index: 1;
  a {
    text-decoration: none;
    color: #1526bd;
    &:hover {
      background: linear-gradient(
        to right,
        #080808c5 0%,
        #c616cc 25%,
        #6006d6 50%,
        #1d1c1d 75%,
        #070707 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: rainbow-text-simple-animation-rev 0.5s ease forwards;
      @keyframes rainbow-text-simple-animation-rev {
        0% {
          background-size: 650%;
        }
        40% {
          background-size: 650%;
        }
        100% {
          background-size: 100%;
        }
      }
    }
    &:visited {
      color: white;
    }
    &:focus {
      box-shadow: 0px 2px 1px #02ccaf;
      outline: none;
    }
  }
`;

export const Header = () => {
  return (
    <HeaderWrapper>
      <Logo>
        <img src={logo} alt="logo"></img>
      </Logo>
      <CompanyName> BikeStories</CompanyName>
      <LogAndRegWrapper>
        <Button name="Login" color="#02CCAF"></Button>
        <RegSpan>
          <Link to={"/registration"}>Registration</Link>
        </RegSpan>
      </LogAndRegWrapper>
    </HeaderWrapper>
  );
};
