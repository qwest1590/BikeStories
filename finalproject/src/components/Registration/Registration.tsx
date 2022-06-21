import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Background } from "../../App";
import background from "../../images/bicycleRiding.jpg";
import { Button } from "../Button/Button";
import { Logo, CompanyName } from "../Header/Header";
import logo from "../../images/logo.jpg";
import { useNavigate } from "react-router-dom";
import { clearMesssage, signUpUser } from "../../redux/actions/actions";
import { useAppSelector, useTypedDispatch } from "../..";
import { Spinner } from "../Spinner/Spinner";
import { clientId } from "../../redux/types/types";

const PageWrapper = styled.div`
  height: 100vh;
`;

export const FormWrapper = styled.div`
  height: 650px;
  width: 620px;
  background: linear-gradient(#d4e8f5, #abc9db, #58a9db);
  border-radius: 10px;
  display: flex;
  flex-flow: column;
  padding: 15px;
  box-sizing: border-box;
  margin: auto;
  margin-top: 100px;
  form {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-self: center;
    width: 580px;
  }
  @media (max-width: 640px) {
    width: 375px;
    form {
      justify-self: center;
      width: 350px;
    }
  }
  h1 {
    background: linear-gradient(
      to right,
      #1526bd 0%,
      #c616cc 50%,
      #6006d6 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    border-bottom: 2px solid #1526bd;
  }
  button {
    width: 95%;
    margin-top: 120px;
    align-self: center;
  }
`;

export const LabelInput = styled.div`
  padding-top: 20px;
  label {
    font-size: 1.2rem;
  }
  input {
    width: 560px;
    height: 30px;
    margin-top: 8px;
    border-radius: 5px;
    border: none;
    filter: drop-shadow(0 0 0.75rem #58a9db);
    padding-left: 15px;
    font-size: 1.2rem;
    &.short {
      width: 355px;
      @media (max-width: 500px) {
        width: 250px;
      }
    }
    @media (max-width: 640px) {
      width: 335px;
    }
    &:focus {
      outline: 1px solid #6006d6;
    }
  }
`;

export const ErrorMessage = styled.div`
  height: 70px;
  width: 330px;
  background-color: ${(props) => props.color};
  margin-top: 10px;
  border-radius: 10px;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.2rem;
  padding: 2px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  button {
    margin-left: 5px;
  }
`;

export const Registration = () => {
  const [newOfficer, setNewOfficer] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    clientId: clientId,
    approved: false,
  });

  const messageForUser = useAppSelector((state) => state.app.messageForUser);
  const isLoading = useAppSelector((state) => state.app.isFetching);

  const [errorMessage, setErrorMessage] = useState({
    visible: false,
    message: "",
  });

  useEffect(() => {
    messageForUser.message !== null
      ? setErrorMessage({ visible: true, message: messageForUser.message })
      : setErrorMessage({ visible: false, message: "" });
  }, [messageForUser, isLoading]);

  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const formVerification = () => {
    const mailRexExp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (!newOfficer.email.match(mailRexExp)) {
      setErrorMessage({ visible: true, message: "Incorrect Email" });
      return;
    }
    if (newOfficer.password.length > 12 || newOfficer.password.length < 3) {
      setErrorMessage({
        visible: true,
        message:
          "Password should be contain more than 3 and less than 12 characters",
      });
      return;
    }
    return true;
  };

  const onClickExitButton = () => {
    setErrorMessage({ visible: false, message: "" });
    dispatch(clearMesssage());
    navigate("/");
  };

  const onSumbitHandler = () => {
    if (formVerification()) {
      setErrorMessage({ visible: false, message: "" });
      dispatch(signUpUser(newOfficer));
    } else return;
  };

  return (
    <>
      <Background src={background} alt="background"></Background>
      <PageWrapper>
        <Header>
          <Logo>
            {" "}
            <img src={logo} alt="logo"></img>
          </Logo>
          <CompanyName>BikeStories</CompanyName>
          <Button
            name="Exit"
            color="#0aa758"
            onClick={onClickExitButton}
          ></Button>
        </Header>
        <FormWrapper>
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Registration Form</h1>
            <ErrorMessage
              color={messageForUser.type === "success" ? "#02CCAF" : "#f77066"}
              style={
                errorMessage.visible
                  ? { visibility: "initial" }
                  : { visibility: "hidden" }
              }
            >
              {errorMessage.message}
            </ErrorMessage>
            <LabelInput>
              <label>
                Enter your Email:
                <input
                  type={"text"}
                  placeholder="Example123@mail.ru"
                  onChange={(e) =>
                    setNewOfficer((prevState) => ({
                      ...prevState,
                      email: e.target.value,
                    }))
                  }
                ></input>
              </label>
            </LabelInput>
            <LabelInput>
              <label>
                Enter your Password:
                <input
                  type={"password"}
                  placeholder={"Password"}
                  onChange={(e) =>
                    setNewOfficer((prevState) => ({
                      ...prevState,
                      password: e.target.value,
                    }))
                  }
                ></input>
              </label>
            </LabelInput>
            <LabelInput>
              <label>
                FirstName:
                <input
                  type={"text"}
                  placeholder="Dmitriy"
                  onChange={(e) =>
                    setNewOfficer((prevState) => ({
                      ...prevState,
                      firstName: e.target.value,
                    }))
                  }
                ></input>
              </label>
            </LabelInput>
            <LabelInput>
              <label>
                LastName:
                <input
                  type={"text"}
                  placeholder="Vorobyev"
                  onChange={(e) =>
                    setNewOfficer((prevState) => ({
                      ...prevState,
                      lastName: e.target.value,
                    }))
                  }
                ></input>
              </label>
            </LabelInput>
            <Button
              name="Create"
              color="#0aa758"
              onClick={onSumbitHandler}
              children={<Spinner></Spinner>}
              isLoading={isLoading}
            ></Button>
          </form>
        </FormWrapper>
      </PageWrapper>
    </>
  );
};
