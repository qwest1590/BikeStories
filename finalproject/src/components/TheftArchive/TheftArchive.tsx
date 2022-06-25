import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  DeleteButton,
  flexCell,
  Footer,
  Officer,
  OfficerHeader,
  StaffPageHeader,
  StaffPageWrapper,
} from "../Officers/Officers";
import theftImg from "../../images/theft.jpg";
import { Button } from "../Button/Button";
import dayjs from "dayjs";
import { useAppSelector, useTypedDispatch } from "../..";
import { useNavigate } from "react-router-dom";
import {
  deleteCaseById,
  editCaseOpened,
  getAllCases,
} from "../../redux/actions/actions";
import { Spinner } from "../Spinner/Spinner";

export const ArchievePageWrapper = styled(StaffPageWrapper)``;

export const ArchieveHeader = styled(StaffPageHeader)``;

const TheftCasesHeader = styled(OfficerHeader)``;

const Case = styled(Officer)`
  @media (max-width: 750px) {
    grid-template-columns: 17px 100px 80px 55px 92px;
  }
`;
const TheftNumber = styled.div`
  ${flexCell};
  font-size: 1.2rem;
`;
const FullName = styled.div`
  ${flexCell}
  @media (max-width: 750px) {
    display: none;
  }
`;

const CreatedAt = styled.div`
  ${flexCell}
`;

const Status = styled.div`
  ${flexCell}
`;

const ButtonWrapper = styled.div`
  ${flexCell}
`;

const SpinnerWrapper = styled.div`
  align-self: center;
  margin-top: 50px;
`;

export interface ITheft {
  _id: string;
  status: string;
  licenseNumber: string;
  type: string;
  ownerFullName: string;
  clientId: string;
  createdAt: string;
  updatedAt?: Date;
  color?: string;
  date: Date | string;
  officer?: string;
  description?: string;
  resolution?: string;
}

export const TheftArchive = () => {
  const [refreshList, setRefreshList] = useState(false);
  const day = dayjs().format("DD/MM/YYYY");
  const cases = useAppSelector((state) => state.data.cases);
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const isLoading = useAppSelector((state) => state.data.isFetching);

  const onExitHandler = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(getAllCases());
  }, [dispatch]);

  const cutLongString = (str: string, to: number) => {
    const newStr = str;
    if (newStr.length > to) {
      return newStr.substring(0, to) + "...";
    } else return newStr;
  };

  const onDeleteHandler = (id: string) => {
    dispatch(deleteCaseById(id));
    setRefreshList(!refreshList);
  };

  const onClickDetails = (theft: ITheft) => {
    dispatch(editCaseOpened(theft));
    navigate(`/cases/${theft._id}`);
  };

  return (
    <ArchievePageWrapper>
      <ArchieveHeader>
        <img src={theftImg} alt=""></img>
        <h1>Theft Archieve</h1>
        <Button name="Exit" color="#0aa758" onClick={onExitHandler}></Button>
      </ArchieveHeader>
      <TheftCasesHeader>
        <TheftNumber>№</TheftNumber>
        <FullName>FullName</FullName>
        <CreatedAt>Created at</CreatedAt>
        <Status>Status</Status>
        <div>
          Delete<br></br> Case
        </div>
        <div>
          Details <br></br> Page
        </div>
      </TheftCasesHeader>
      {cases !== []
        ? cases.map((theft: ITheft, index: any) => (
            <Case key={theft._id}>
              <TheftNumber>{index}</TheftNumber>
              <FullName>{cutLongString(theft.ownerFullName, 17)}</FullName>
              <CreatedAt>{cutLongString(theft.createdAt, 10)}</CreatedAt>
              <Status>{theft.status}</Status>
              <ButtonWrapper>
                {" "}
                <DeleteButton onClick={() => onDeleteHandler(theft._id)}>
                  X
                </DeleteButton>
              </ButtonWrapper>
              <ButtonWrapper>
                <Button
                  name="details"
                  color="#02CCAF"
                  onClick={() => onClickDetails(theft)}
                ></Button>
              </ButtonWrapper>
            </Case>
          ))
        : null}

      <SpinnerWrapper
        style={isLoading ? { visibility: "initial" } : { visibility: "hidden" }}
      >
        <Spinner></Spinner>
      </SpinnerWrapper>
      <Footer>
        <h2>
          Actual Cases for <span> {day}</span>
        </h2>
      </Footer>
    </ArchievePageWrapper>
  );
};
