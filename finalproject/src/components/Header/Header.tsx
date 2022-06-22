import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Button } from "../Button/Button";
import logo from "../../images/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { LabelInput } from "../Registration/Registration";
import { ErrorMessage } from "../Registration/Registration";
import { useAppSelector, useTypedDispatch } from "../..";
import {
  clearMesssage,
  getAllOfficers,
  logOut,
  signInUser,
} from "../../redux/actions/actions";
import avatar from "../../images/userAvatar.jpg";
import { Spinner } from "../Spinner/Spinner";

const HeaderWrapper = styled.div`
  height: 100px;
  background-color: #3a9ad6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const CompanyName = styled.span`
  font-family: fantasy;
  font-size: 2.5rem;
  background: linear-gradient(to right, #1526bd 0%, #c616cc 50%, #6006d6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 500px) {
    font-size: 1.5rem;
  }
`;

export const Logo = styled.div`
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

const SideMenu = styled.nav`
  display: flex;
  flex-flow: column;
  height: 360px;
  position: absolute;
  width: 375px;
  top: 0px;
  right: 3px;
  z-index: 3;
  border-radius: 15px;
  background: linear-gradient(#3a9ad6, #3148ce, #6006d6);
  opacity: 1;
  transform: translateY(-100%);
  transition: transform 1s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 20px;
  @media (max-width: 500px) {
    width: 290px;
    div {
      width: 250px;
    }
  }
  &.active {
    transform: translateY(0%);
  }
  h2 {
    text-align: center;
    font-size: 2rem;
    font-family: math;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
  button {
    &:first-of-type:hover {
      box-shadow: inset 0 0 0 40px #c71a14;
    }
  }
`;

const User = styled.button`
  height: 60px;
  min-width: 60px;
  border-radius: 50px;
  border: none;
  background: url(${avatar});
  background-size: cover;
  cursor: pointer;
  &:hover {
    filter: drop-shadow(0 0 0.5rem #02ccaf);
  }
  &:focus {
    outline: 1px solid #134fc0;
  }
`;

const LogOutWrapper = styled.div`
  position: relative;
  width: 162px;
  display: flex;
  align-items: center;
  justify-items: center;
  flex-flow: column;
  margin-right: 5px;
  @media (max-width: 500px) {
    width: auto;
  }
`;

const LogOutHiddenButton = styled.button`
  &.hidden {
    display: none;
  }
  &.visible {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    height: 40px;
    position: absolute;
    width: 70px;
    top: 85px;
    right: 47px;
    z-index: 3;
    border-radius: 7px;
    background: #02ccaf;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    color: white;
    @media (max-width: 500px) {
      top: 65px;
      right: 0px;
    }
    &:hover {
      box-shadow: inset 0 0 0 23px #14c74a;
    }
    &:focus {
      outline: 1px ridge #3a9ad6;
    }
  }
`;

const UserName = styled.span`
  font-size: 1.2rem;
  font-style: italic;
  @media (max-width: 500px) {
    display: none;
  }
`;

export const Header = () => {
  const initialUserData = useMemo(() => {
    return {
      email: "",
      password: "",
    };
  }, []);

  const [isOpen, setIsopen] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const [errorMessage, setErrorMessage] = useState({
    visible: false,
    message: "",
  });
  const [logoutIsVisible, setLogoutIsVisible] = useState(false);

  const dispatch = useTypedDispatch();
  const messageForUser = useAppSelector((state) => state.app.messageForUser);
  const isLoading = useAppSelector((state) => state.app.isFetching);
  const user = useAppSelector((state) => state.app.loginnedUser);

  useEffect(() => {
    messageForUser.message !== null
      ? setErrorMessage({ visible: true, message: messageForUser.message })
      : setErrorMessage({ visible: false, message: "" });
  }, [messageForUser, isLoading]);

  useEffect(() => {
    setIsopen(false);
    setUserData(initialUserData);
  }, [user, initialUserData]);

  const onClickHandler = () => {
    setIsopen(!isOpen);
  };

  const onSubmitHandler = () => {
    dispatch(signInUser(userData));
    dispatch(getAllOfficers());
  };

  const onCloseHandler = () => {
    setIsopen(false);
    dispatch(clearMesssage());
    setUserData(initialUserData);
  };

  const onClickUser = () => {
    setLogoutIsVisible(!logoutIsVisible);
  };

  const onClickLogOut = () => {
    dispatch(logOut());
  };

  const nameChecking = () => {
    if (user.firstName) {
      const str = `${user.firstName}`;
      if (str.length > 15) {
        const sliced = str.slice(1, 12) + "...";
        return sliced;
      }
      return str;
    } else return "User";
  };

  return (
    <HeaderWrapper>
      <Logo>
        <img src={logo} alt="logo"></img>
      </Logo>
      <CompanyName> BikeStories</CompanyName>
      {user.id !== null ? (
        <LogOutWrapper>
          <LogOutHiddenButton
            className={logoutIsVisible ? "visible" : "hidden"}
            onClick={onClickLogOut}
          >
            Log Out
          </LogOutHiddenButton>
          <User onClick={onClickUser}></User>
          <UserName>{nameChecking()}</UserName>
        </LogOutWrapper>
      ) : (
        <LogAndRegWrapper>
          <Button
            name="Login"
            color="#02CCAF"
            onClick={onClickHandler}
          ></Button>
          <RegSpan>
            <Link
              to={"/registration"}
              onClick={() => dispatch(clearMesssage())}
            >
              Registration
            </Link>
          </RegSpan>
          <SideMenu className={isOpen ? "active" : ""}>
            <h2>
              {" "}
              <i>Welcome</i>
            </h2>
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
                {" "}
                Enter your email: <br></br>
                <input
                  className="short"
                  type={"text"}
                  onChange={(e) =>
                    setUserData((prevState) => ({
                      ...prevState,
                      email: e.target.value,
                    }))
                  }
                  value={userData.email}
                ></input>
                <br></br>
              </label>
            </LabelInput>
            <LabelInput>
              <label>
                Enter your password: <br></br>
                <input
                  className="short"
                  type={"password"}
                  onChange={(e) =>
                    setUserData((prevState) => ({
                      ...prevState,
                      password: e.target.value,
                    }))
                  }
                  value={userData.password}
                ></input>
              </label>
            </LabelInput>
            <ButtonWrapper>
              <Button
                name="Close"
                color="#cc4c02"
                onClick={onCloseHandler}
              ></Button>
              <Button
                name="Log In"
                color="#02CCAF"
                onClick={onSubmitHandler}
                children={<Spinner></Spinner>}
                isLoading={isLoading}
              ></Button>
            </ButtonWrapper>
          </SideMenu>
        </LogAndRegWrapper>
      )}
    </HeaderWrapper>
  );
};
