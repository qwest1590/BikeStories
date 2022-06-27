import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  IOfficer,
  StaffPageHeader,
  StaffPageWrapper,
} from "../Officers/Officers";
import staff from "../../../images/staff.jpg";
import { Button } from "../../Button/Button";
import { ErrorMessage, FormWrapper } from "../Registration/Registration";
import { LabelInput } from "../Registration/Registration";
import { Spinner } from "../../Spinner/Spinner";
import { useAppSelector, useTypedDispatch } from "../../..";
import {
  editOfficerById,
  editOfficerClosed,
} from "../../../redux/actions/actions";
import { useNavigate } from "react-router-dom";

const DetailFormWrapper = styled(FormWrapper)`
  height: 650px;
`;

export const RadioWrapper = styled.div`
  font-size: 2rem;
  span {
    margin-right: 200px;
    align-self: center;
    @media (max-width: 640px) {
      margin-right: 20px;
      font-size: 1.8rem;
    }
  }
  div {
    display: flex;
    flex-flow: row;
    text-align: center;
    label {
      margin-left: 20px;
    }
    input {
      width: 50px;
      cursor: pointer;
      &:focus {
        outline: none;
      }
    }
  }
`;

export const OfficerDetail = (officer: IOfficer) => {
  const isLoading = useAppSelector((state) => state.data.isFetching);
  const [officerData, setOfficerData] = useState(officer);
  const messageForUser = useAppSelector((state) => state.data.messageForUser);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({
    visible: false,
    message: "",
  });

  useEffect(() => {
    messageForUser.message !== null
      ? setErrorMessage({ visible: true, message: messageForUser.message })
      : setErrorMessage({ visible: false, message: "" });
  }, [messageForUser, isLoading]);

  const onConfirmHandler = () => {
    dispatch(editOfficerById(officerData));
  };

  const onExitHandler = () => {
    navigate("/officers");
    dispatch(editOfficerClosed());
  };

  return (
    <StaffPageWrapper>
      <StaffPageHeader>
        <img src={staff} alt=""></img>
        <h1>Staff Managment</h1>
        <Button name="Exit" color="#0aa758" onClick={onExitHandler}></Button>
      </StaffPageHeader>
      <DetailFormWrapper>
        <h1>Detail Officer Form</h1>
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
            Officer's Email:
            <input
              type={"text"}
              defaultValue={officerData.email}
              readOnly
            ></input>
          </label>
        </LabelInput>
        <LabelInput>
          <label>
            Officer'<s></s> FirstName:
            <input
              onChange={(e) =>
                setOfficerData((prevState) => ({
                  ...prevState,
                  firstName: e.target.value,
                }))
              }
              type={"text"}
              defaultValue={officerData.firstName}
            ></input>
          </label>
        </LabelInput>
        <LabelInput>
          <label>
            Officer's LastName:
            <input
              onChange={(e) =>
                setOfficerData((prevState) => ({
                  ...prevState,
                  lastName: e.target.value,
                }))
              }
              type={"text"}
              defaultValue={officerData.lastName}
            ></input>
          </label>
        </LabelInput>
        <LabelInput>
          <label>
            Officer's ClientID:
            <input
              type={"text"}
              defaultValue={officerData.clientId}
              readOnly
            ></input>
          </label>
        </LabelInput>
        <RadioWrapper>
          <LabelInput>
            <span> Approved:</span>
            <label>
              {" "}
              Yes
              <input
                onChange={() =>
                  setOfficerData((prevState) => ({
                    ...prevState,
                    approved: true,
                  }))
                }
                type={"radio"}
                checked={officerData.approved ? true : false}
              ></input>{" "}
            </label>
            <label>
              No
              <input
                onChange={() =>
                  setOfficerData((prevState) => ({
                    ...prevState,
                    approved: false,
                  }))
                }
                type={"radio"}
                checked={!officerData.approved ? true : false}
              ></input>
            </label>
          </LabelInput>
        </RadioWrapper>
        <Button
          name={"Confirm Changes"}
          color={"#0aa758"}
          onClick={onConfirmHandler}
          children={<Spinner></Spinner>}
          isLoading={isLoading}
        ></Button>
      </DetailFormWrapper>
    </StaffPageWrapper>
  );
};
