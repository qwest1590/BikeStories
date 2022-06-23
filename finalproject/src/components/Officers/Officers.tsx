import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useAppSelector, useTypedDispatch } from "../..";
import {
  deleteOfficerById,
  editOfficerOpened,
  getAllOfficers,
} from "../../redux/actions/actions";
import staff from "../../images/staff.jpg";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Spinner } from "../Spinner/Spinner";

export const StaffPageWrapper = styled.div`
  background: linear-gradient(#3a9ad6, #02ccaf, #1526bd);
  display: flex;
  flex-flow: column;
  min-height: 100vh;
`;
export const StaffPageHeader = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px 0px 10px;
  img {
    border-radius: 40px;
    opacity: 0.7;
    height: 95px;
    @media (max-width: 600px) {
      height: 70px;
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
    font-size: 2.5rem;
    text-align: center;
    margin: 0px 5px;
    @media (max-width: 600px) {
      font-size: 1.3rem;
    }
  }
`;

export const flexCell = css`
  height: 100%;
  display: flex;
  align-items: center;
  border-right: 2px solid #7e61a3;
  justify-content: center;
`;

export const Officer = styled.div`
  display: grid;
  grid-template-columns: 25px 150px 150px 200px 100px 100px;
  height: 55px;
  align-self: center;
  outline: 2px solid #7e61a3;
  border-radius: 5px;
  @media (max-width: 750px) {
    grid-template-columns: 17px 100px 100px 55px 92px;
  }
`;

export const OfficerHeader = styled(Officer)`
  height: 55px;
  outline: none;
  font-size: 1.2rem;
  margin-top: 100px;
  @media (max-width: 750px) {
    font-size: 0.9rem;
    font-weight: 600;
  }
  div {
    border-right: none;
    text-align: center;
    font-family: cursive;
  }
`;

export const DeleteButton = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: none;
  font-size: 2rem;
  background: linear-gradient(#cc1616, #f34425);
  cursor: pointer;
  &:hover {
    background: #fd0000;
  }
  &:focus {
    outline: 1px ridge #3a9ad6;
  }
`;

export const Footer = styled.div`
  height: 100px;
  margin-top: 300px;
  align-self: center;
`;

const Number = styled.div`
  font-family: fantasy;
  font-size: 1.2rem;
  ${flexCell}
`;

const FirstName = styled.div`
  ${flexCell}
`;

const SecondName = styled.div`
  ${flexCell}
`;

const Email = styled.div`
  ${flexCell}
  @media (max-width: 750px) {
    display: none;
  }
`;

const SpinnerWrapper = styled.div`
  align-self: center;
  margin-top: 50px;
`;

const ButtonWrapper = styled.div`
  ${flexCell}
`;

export interface IOfficer {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  clientId: string;
  approved: boolean;
  __v: number;
}

export const Officers = () => {
  const [refreshList, setRefreshList] = useState(false);
  const dispatch = useTypedDispatch();
  const officers = useAppSelector((state) => state.data.officers);
  const navigate = useNavigate();
  const day = dayjs().format("DD/MM/YYYY");
  const isLoading = useAppSelector((state) => state.data.isFetching);

  const onExitClick = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(getAllOfficers());
  }, [dispatch]);

  const onDeleteHandler = (id: string) => {
    dispatch(deleteOfficerById(id));
    setRefreshList(!refreshList);
  };

  const cutLongString = (str: string, to: number) => {
    const newStr = str;
    if (newStr.length > to) {
      return newStr.substring(0, to) + "...";
    } else return newStr;
  };

  const onClickDetails = (officer: IOfficer) => {
    dispatch(editOfficerOpened(officer));
    navigate(`/officers/${officer._id}`);
  };

  return (
    <StaffPageWrapper>
      <StaffPageHeader>
        <img src={staff} alt=""></img>
        <h1>Staff Managment</h1>
        <Button onClick={onExitClick} name="Exit" color="#0aa758"></Button>
      </StaffPageHeader>
      <OfficerHeader>
        <Number>№</Number>
        <FirstName>FirstName</FirstName>
        <SecondName>SecondName</SecondName>
        <Email>Email</Email>
        <div>Dismiss Officer</div>
        <div>
          Details <br></br> Page
        </div>
      </OfficerHeader>

      {officers !== []
        ? officers.map((officer: IOfficer, index: any) => (
            <Officer key={officer._id}>
              <Number>{index}</Number>
              <FirstName>{cutLongString(officer.firstName, 11)}</FirstName>
              <SecondName>{cutLongString(officer.lastName, 11)}</SecondName>
              <Email>{cutLongString(officer.email, 20)}</Email>
              <ButtonWrapper>
                <DeleteButton onClick={() => onDeleteHandler(officer._id)}>
                  X
                </DeleteButton>
              </ButtonWrapper>
              <ButtonWrapper>
                <Button
                  name="details"
                  color="#02CCAF"
                  onClick={() => onClickDetails(officer)}
                ></Button>
              </ButtonWrapper>
            </Officer>
          ))
        : null}

      <SpinnerWrapper
        style={isLoading ? { visibility: "initial" } : { visibility: "hidden" }}
      >
        <Spinner></Spinner>
      </SpinnerWrapper>

      <Footer>
        <h2>
          Actual Staff for <span> {day}</span>
        </h2>
      </Footer>
    </StaffPageWrapper>
  );
};
