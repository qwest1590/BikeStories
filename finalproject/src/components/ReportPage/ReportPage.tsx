import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../Button/Button";
import { FormWrapper, LabelInput } from "../Registration/Registration";
import logo from "../../images/logo.jpg";
import { Logo } from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../Registration/Registration";
import { Dropdown } from "../Dropdown/Dropdown";

const PageWrapper = styled.div`
  background: #000000d3;
  height: auto;
`;

const ReportFormWrapper = styled(FormWrapper)`
  height: 900px;
  padding-bottom: 30px;
  button {
    margin-top: 20px;
  }
`;

const TextArea = styled.textarea`
  width: 565px;
  height: 120px;
  resize: none;
  margin-top: 8px;
  font-size: 1.3rem;
  padding: 5px;
  border-radius: 5px;
  border: none;

  @media (max-width: 640px) {
    width: 335px;
  }
  &:focus {
    outline: 1px solid #6006d6;
  }
`;

const TextAreaWrapper = styled.div`
  padding-top: 20px;
  label {
    font-size: 1.2rem;
  }
`;

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

interface IreportPageProps {
  approved: boolean;
}

export const ReportPage = (props: IreportPageProps) => {
  const [errorMessage, setErrorMessage] = useState({
    visible: false,
    message: "",
  });
  const navigate = useNavigate();
  const dateForInput = new Date()
    .toLocaleDateString()
    .replace(/\./gi, "-")
    .split("-")
    .reverse()
    .join("-");

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
      <ReportFormWrapper style={{ marginTop: "0px" }}>
        <h1>Report a Theft</h1>
        <ErrorMessage></ErrorMessage>
        <form>
          {props.approved ? (
            <Dropdown
              options={["Vasya ", "Petya", "Igor"]}
              label="Choose the Employe"
              description="Employe: "
            ></Dropdown>
          ) : null}
          <LabelInput>
            <label>
              Licence №:
              <input type={"text"}></input>
            </label>
          </LabelInput>
          <LabelInput>
            <label>
              FirstName,LastName:
              <input type={"text"}></input>
            </label>
          </LabelInput>
          <Dropdown
            options={["Sport ", "City ", "Children"]}
            label="Choose the Type"
            description="Type of Bike: "
          ></Dropdown>
          <LabelInput>
            <label>
              Color of Bike:
              <input type={"text"}></input>
            </label>
          </LabelInput>
          <LabelInput>
            <label>
              Date of theft:
              <input type={"date"} defaultValue={dateForInput}></input>
            </label>
          </LabelInput>
          <TextAreaWrapper>
            <label>
              {" "}
              Additional information:
              <TextArea></TextArea>
            </label>
          </TextAreaWrapper>
          <Button color="#02CCAF" name="Send Report"></Button>
        </form>
      </ReportFormWrapper>
    </PageWrapper>
  );
};
