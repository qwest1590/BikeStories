import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppSelector, useTypedDispatch } from "../../..";
import {
  ArchieveHeader,
  ArchievePageWrapper,
  ITheft,
} from "../TheftArchive/TheftArchive";
import theftImg from "../../../images/theft.jpg";
import { Button } from "../../Button/Button";
import { useNavigate } from "react-router-dom";
import {
  ErrorMessage,
  FormWrapper,
  LabelInput,
} from "../Registration/Registration";
import { Dropdown } from "../../Dropdown/Dropdown";
import { IOfficer } from "../Officers/Officers";
import dayjs from "dayjs";
import { RadioWrapper } from "../OfficerDetail/OfficerDetail";
import { Spinner } from "../../Spinner/Spinner";
import { TextArea, TextAreaWrapper } from "../ReportPage/ReportPage";
import { EditCaseById } from "../../../redux/actions/actions";
import { set } from "immer/dist/internal";

const TheftDelailFormWrapper = styled(FormWrapper)`
  height: 1450px;
  @media (max-width: 640px) {
    width: 355px;
  }
  form {
    @media (max-width: 640px) {
      width: 335px;
    }
  }
`;

const Comment = styled(TextArea)`
  @media (max-width: 640px) {
    width: 315px;
  }
`;

export const TheftDetail = (theft: ITheft) => {
  const navigate = useNavigate();
  const isLoading = useAppSelector((state) => state.data.isFetching);
  const [theftData, setTheftData] = useState(theft);
  const [errorMessage, setErrorMessage] = useState({
    visible: false,
    message: "",
  });
  const messageForUser = useAppSelector((state) => state.data.messageForUser);
  const officers = useAppSelector((state) => state.data.officers);
  const dispatch = useTypedDispatch();
  const approvedOfficers = officers.filter(
    (officer: IOfficer) => officer.approved
  );

  const makeLabelForFiredOfficer = () => {
    const ApprovedIdArr = approvedOfficers.map(
      (officer: IOfficer) => officer._id
    );
    const index = ApprovedIdArr.indexOf(theftData.officer);
    if (index !== -1) {
      return `${approvedOfficers[index].firstName} ${approvedOfficers[index].lastName}`;
    } else {
      setTheftData((prevState: ITheft) => ({ ...prevState, officer: null }));
      return "";
    }
  };

  useEffect(() => {
    messageForUser.message !== null
      ? setErrorMessage({ visible: true, message: messageForUser.message })
      : setErrorMessage({ visible: false, message: "" });
  }, [messageForUser, isLoading]);

  const dateForInput = dayjs(theftData.date).format("YYYY-MM-DD");
  const dateToStringCreated = dayjs(theftData.createdAt).format(
    "DD/MM/YYYY  HH:mm:ss"
  );
  const dateToStringUpdated = dayjs(theftData.updatedAt).format(
    "DD/MM/YYYY  HH:mm:ss"
  );

  const onExitHandler = () => {
    navigate("/cases");
  };

  const onSubmitHandler = (theftData: ITheft) => {
    if (formVerification()) {
      dispatch(EditCaseById(theftData));
    } else return;
  };

  const onChangeOfficerDropdown = (value: string) => {
    setTheftData((prevState) => ({
      ...prevState,
      officer: value,
    }));
  };

  const onChangeTypeDropdown = (value: string) => {
    setTheftData((prevState) => ({
      ...prevState,
      type: value,
    }));
  };

  const formVerification = () => {
    if (theftData.licenseNumber === "") {
      setErrorMessage({ visible: true, message: "Licence № cannot be Empty" });
      window.scroll(0, 0);
      return;
    }
    if (theftData.ownerFullName === "") {
      setErrorMessage({ visible: true, message: "Fullname cannot be Empty" });
      window.scroll(0, 0);
      return;
    }
    if (
      theftData.status === "done" &&
      (theftData.resolution == null || theftData.resolution === "")
    ) {
      setErrorMessage({
        visible: true,
        message: "Please write some resolution",
      });
      window.scroll(0, 0);
      return;
    }
    return true;
  };

  return (
    <ArchievePageWrapper>
      <ArchieveHeader>
        <img src={theftImg} alt=""></img>
        <h1>Theft Archieve</h1>
        <Button name="Exit" color="#0aa758" onClick={onExitHandler}></Button>
      </ArchieveHeader>
      <TheftDelailFormWrapper>
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Detail Case Form</h1>

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
              License №:
              <input
                type={"text"}
                defaultValue={theftData.licenseNumber}
                onChange={(e) =>
                  setTheftData((prevState) => ({
                    ...prevState,
                    licenseNumber: e.target.value,
                  }))
                }
              ></input>
            </label>
          </LabelInput>
          <LabelInput>
            <label>
              FullName:
              <input
                onChange={(e) =>
                  setTheftData((prevState) => ({
                    ...prevState,
                    ownerFullName: e.target.value,
                  }))
                }
                type={"text"}
                defaultValue={theftData.ownerFullName}
              ></input>
            </label>
          </LabelInput>

          <Dropdown
            options={approvedOfficers.map((officer: IOfficer) => [
              officer.firstName + " " + officer.lastName,
              officer._id,
            ])}
            label={
              theftData.officer == null
                ? "Choose the Officer"
                : makeLabelForFiredOfficer()
            }
            description="Employe: "
            onChange={onChangeOfficerDropdown}
          ></Dropdown>

          <LabelInput>
            <label>
              Color:
              <input
                onChange={(e) =>
                  setTheftData((prevState) => ({
                    ...prevState,
                    color: e.target.value,
                  }))
                }
                type={"text"}
                defaultValue={theftData.color}
              ></input>
            </label>
          </LabelInput>

          <Dropdown
            options={["Sport ", "General"]}
            label={
              theftData.type.charAt(0).toUpperCase() + theftData.type.slice(1)
            }
            description="Type of Bike: "
            onChange={onChangeTypeDropdown}
          ></Dropdown>

          <LabelInput>
            <label>
              ClientID:
              <input
                type={"text"}
                defaultValue={theftData.clientId}
                readOnly
              ></input>
            </label>
          </LabelInput>
          <LabelInput>
            <label>
              Date of Theft:
              <input type={"date"} defaultValue={dateForInput} readOnly></input>
            </label>
          </LabelInput>
          <LabelInput>
            <label>
              Created AT:
              <input
                type={"text"}
                defaultValue={dateToStringCreated}
                readOnly
              ></input>
            </label>
          </LabelInput>
          <LabelInput>
            <label>
              Updated AT:
              <input
                type={"text"}
                defaultValue={
                  dateToStringUpdated === "Invalid Date"
                    ? "Was not Updated Yet"
                    : dateToStringUpdated
                }
                readOnly
              ></input>
            </label>
          </LabelInput>
          <RadioWrapper>
            <LabelInput>
              <span> Status:</span>
              <label>
                {" "}
                In Progress
                <input
                  onChange={() =>
                    setTheftData((prevState) => ({
                      ...prevState,
                      status: "in_progress",
                    }))
                  }
                  type={"radio"}
                  checked={theftData.status === "in_progress" ? true : false}
                ></input>{" "}
              </label>
              <label>
                Done
                <input
                  onChange={() =>
                    setTheftData((prevState) => ({
                      ...prevState,
                      status: "done",
                    }))
                  }
                  type={"radio"}
                  checked={theftData.status === "done" ? true : false}
                ></input>
              </label>
            </LabelInput>
          </RadioWrapper>
          <TextAreaWrapper>
            <label>
              {" "}
              Additional Info:
              <Comment readOnly defaultValue={theftData.description}></Comment>
            </label>
          </TextAreaWrapper>
          <TextAreaWrapper>
            <label>
              {" "}
              Resolution:
              <Comment
                readOnly={theftData.status === "done" ? false : true}
                onChange={(e) =>
                  setTheftData((prevState) => ({
                    ...prevState,
                    resolution: e.target.value,
                  }))
                }
                defaultValue={theftData.resolution}
              ></Comment>
            </label>
          </TextAreaWrapper>
          <Button
            name={"Confirm Changes"}
            color={"#0aa758"}
            children={<Spinner></Spinner>}
            isLoading={isLoading}
            onClick={() => onSubmitHandler(theftData)}
          ></Button>
        </form>
      </TheftDelailFormWrapper>
    </ArchievePageWrapper>
  );
};
