import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppSelector, useTypedDispatch } from "../..";
import { getAllOfficers } from "../../redux/actions/actions";
import staff from "../../images/staff.jpg";
import { Button } from "../Button/Button";

interface IOfficer {
  approved: boolean;
  clientId: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  __v: number;
  _id: string;
}

const StuffPageWrapper = styled.div`
  background: linear-gradient(#3a9ad6, #02ccaf, #1526bd);
  display: flex;
  flex-flow: column;
  height: 100vh;
`;
const StuffPageHeader = styled.div`
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

const Officer = styled.div`
  display: grid;
  grid-template-columns: 25px 150px 150px 200px 100px 100px;
  height: 55px;
  align-self: center;
  outline: 2px solid #7e61a3;
  border-radius: 5px;
  div {
    height: 100%;
    display: flex;
    align-items: center;
    border-right: 2px solid #7e61a3;
    justify-content: center;
  }
`;

const OfficerHeader = styled(Officer)`
  height: 55px;
  outline: none;
  font-size: 1.2rem;
  div {
    border-right: none;
    text-align: center;
  }
`;

const DeleteButton = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: none;
  font-size: 2rem;
  background: linear-gradient(#ec0404, #f34425);
  cursor: pointer;
  &:hover {
    filter: drop-shadow(0 0 0.5rem #ec0404);
    background: #fd0000;
  }
  &:focus {
    outline: 1px ridge #3a9ad6;
  }
`;
const Number = styled.div`
  font-family: fantasy;
  font-size: 1.5rem;
`;
const FirstName = styled.div``;
const SecondName = styled.div``;
const Email = styled.div``;
const ButtonWrapper = styled.div``;
export const Staff = () => {
  const dispatch = useTypedDispatch();
  const officers = useAppSelector((state) => state.data.officers);

  useEffect(() => {
    dispatch(getAllOfficers());
  }, [dispatch]);

  return (
    <StuffPageWrapper>
      <StuffPageHeader>
        <img src={staff} alt=""></img>
        <h1>Staff Managment</h1>
        <Button name="Exit" color="#0aa758"></Button>
      </StuffPageHeader>
      <OfficerHeader>
        <Number>№</Number>
        <FirstName>FirstName</FirstName>
        <SecondName>SecondName</SecondName>
        <Email>Mail</Email>
        <div>Dismiss Officer</div>
        <div>Details Page</div>
      </OfficerHeader>

      {officers.map((officer: IOfficer, index: any) => (
        <Officer key={officer.password}>
          <Number>{index}</Number>
          <FirstName>{officer.firstName}</FirstName>
          <SecondName>{officer.lastName}</SecondName>
          <Email>{officer.email}</Email>
          <ButtonWrapper>
            <DeleteButton>X</DeleteButton>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button name="details" color="#02CCAF"></Button>
          </ButtonWrapper>
        </Officer>
      ))}
    </StuffPageWrapper>
  );
};
