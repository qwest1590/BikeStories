import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../Button/Button";
import { FormWrapper, LabelInput } from "../Registration/Registration";
import logo from "../../images/logo.jpg";
import { Logo } from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../Registration/Registration";
import { Dropdown } from "../Dropdown/Dropdown";
import dayjs from "dayjs";
import { useAppSelector, useTypedDispatch } from "../..";
import { reportATheft } from "../../redux/actions/actions";
import { clientId } from "../../redux/types/types";
const PageWrapper = styled.div`
  background: #000000d3;
  height: auto;
`;

const ReportFormWrapper = styled(FormWrapper)`
  height: 950px;
  padding-bottom: 30px;
  form {
    height: 800px;
  }
  button {
    margin-top: 55px;
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

export const ReportPage = () => {
  const dateForInput = dayjs().format("YYYY-MM-DD");
  const dispatch = useTypedDispatch();
  const messageForUser = useAppSelector((state) => state.data.messageForUser);
  const isLoading = useAppSelector((state) => state.data.isFetching);

  const intitialState = {
    officer: "",
    licenseNumber: "",
    ownerFullName: "",
    type: "",
    color: "",
    date: dateForInput,
    additionalInfo: "",
    clientId: clientId,
  };

  useEffect(() => {
    messageForUser.message !== null
      ? setErrorMessage({ visible: true, message: messageForUser.message })
      : setErrorMessage({ visible: false, message: "" });
  }, [messageForUser, isLoading]);

  const [reportCase, setReportCase] = useState(intitialState);
  const [errorMessage, setErrorMessage] = useState({
    visible: false,
    message: "",
  });
  const navigate = useNavigate();

  const loginned = useAppSelector((state) => state.app.loginnedUser.id);

  const formVerification = () => {
    if (reportCase.licenseNumber === "") {
      setErrorMessage({ visible: true, message: "Licence № is required" });
      return;
    }
    if (reportCase.ownerFullName === "") {
      setErrorMessage({
        visible: true,
        message: "FullName is required,please fill it ",
      });
      return;
    }
    if (reportCase.type === "") {
      setErrorMessage({
        visible: true,
        message: "Please choose type of your bike",
      });
      return;
    }
    return true;
  };

  const onSubmitHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (formVerification()) {
      dispatch(reportATheft(reportCase));
    } else return;
  };

  const onChangeTypeDropdown = (value: string) => {
    setReportCase((prevState) => ({
      ...prevState,
      type: value,
    }));
  };

  const onChangeOfficerDropdown = (value: string) => {
    setReportCase((prevState) => ({
      ...prevState,
      officer: value,
    }));
  };

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
        <form>
          {loginned !== null ? (
            <Dropdown
              options={["Vasya ", "Petya", "Igor"]}
              label="Choose the Officer"
              description="Employe: "
              onChange={onChangeOfficerDropdown}
            ></Dropdown>
          ) : null}
          <LabelInput>
            <label>
              Licence №:
              <input
                onChange={(e) =>
                  setReportCase((prevState) => ({
                    ...prevState,
                    licenseNumber: e.target.value,
                  }))
                }
                type={"text"}
              ></input>
            </label>
          </LabelInput>
          <LabelInput>
            <label>
              FullName:
              <input
                onChange={(e) =>
                  setReportCase((prevState) => ({
                    ...prevState,
                    ownerFullName: e.target.value,
                  }))
                }
                type={"text"}
              ></input>
            </label>
          </LabelInput>
          <Dropdown
            options={["Sport ", "General"]}
            label="Choose the Type"
            description="Type of Bike: "
            onChange={onChangeTypeDropdown}
          ></Dropdown>
          <LabelInput>
            <label>
              Color of Bike:
              <input
                onChange={(e) =>
                  setReportCase((prevState) => ({
                    ...prevState,
                    color: e.target.value,
                  }))
                }
                type={"text"}
              ></input>
            </label>
          </LabelInput>
          <LabelInput>
            <label>
              Date of theft:
              <input
                onChange={(e) =>
                  setReportCase((prevState) => ({
                    ...prevState,
                    date: e.target.value,
                  }))
                }
                type={"date"}
                defaultValue={dateForInput}
              ></input>
            </label>
          </LabelInput>
          <TextAreaWrapper>
            <label>
              {" "}
              Additional information:
              <TextArea
                onChange={(e) =>
                  setReportCase((prevState) => ({
                    ...prevState,
                    additionalInfo: e.target.value,
                  }))
                }
              ></TextArea>
            </label>
          </TextAreaWrapper>
          <Button
            color="#02CCAF"
            name="Send Report"
            onClick={onSubmitHandler}
          ></Button>
        </form>
      </ReportFormWrapper>
    </PageWrapper>
  );
};
