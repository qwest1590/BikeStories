import React from "react";
import styled from "styled-components";
import { Button } from "../Button/Button";
import { FormWrapper } from "../Registration/Registration";
import logo from "../../images/logo.jpg";
import { Logo } from "../Header/Header";
import { useNavigate } from "react-router-dom";

const PageWrapper = styled.div`
  height: 100vh;
  background: #000000d3;
`;

interface IreportPageProps {
  approved: boolean;
}

const Header = styled.div`
  height: 150px;
  display: grid;
  grid-template-columns: 25% 50% 25%;
  align-items: center;
  justify-items: center;
  text-align: center;
  gap: 2px;
  h1 {
    color: white;
    font-style: italic;
    @media (max-width: 670px) {
      font-size: 1.3rem;
    }
  }
  button {
    &:first-of-type:hover {
      box-shadow: inset 0 0 0 40px #c71a14;
    }
  }
`;

export const ReportPage = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Header>
        <Logo>
          <img src={logo} alt="logo"></img>
        </Logo>
        <h1>Please try to remember details,it will help a lot!</h1>
        <Button
          name={"Exit"}
          color={"#cc4c02"}
          onClick={() => navigate("/")}
        ></Button>
      </Header>
      <FormWrapper style={{ marginTop: "0px" }}></FormWrapper>
    </PageWrapper>
  );
};
