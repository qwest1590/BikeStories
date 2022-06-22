import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "../..";
import { Button } from "../Button/Button";
import { Slider } from "../Slider/Slider";

const MainWrapper = styled.div`
  background: linear-gradient(#3a9ad6, #02ccaf, #1526bd);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 1fr 1fr 100px;
  align-items: center;
  justify-content: center;
  @media (max-width: 960px) {
    grid-template-rows: 100px 1fr 1fr 1fr 100px;
  }
  h1 {
    text-align: center;
    font-size: 1.8rem;
    @media (max-width: 680px) {
      font-size: 1.3rem;
    }
    @media (max-width: 500px) {
      font-size: 1rem;
    }
  }
`;

const SliderWrapper = styled.div`
  grid-area: 3/1;
  margin-left: 10px;
  margin-bottom: 60px;
  justify-self: center;
  @media (max-width: 960px) {
    grid-area: 3/1/4/4;
  }
  @media (max-width: 500px) {
    margin-left: 0;
  }
  h2 {
    text-align: center;
    justify-self: center;
    padding-bottom: 8px;
  }
`;

const InfoBlock = styled.div`
  height: 350px;
  width: 420px;
  border: 10px solid skyblue;
  border-image: linear-gradient(to right top, #1526bd, #3a9ad6, #02ccaf);
  border-image-slice: 1;
  margin-left: 10px;
  justify-self: center;
  @media (max-width: 960px) {
    grid-area: 2/1/2/4;
    margin-left: 0px;
  }
  @media (max-width: 500px) {
    width: 320px;
    height: 415px;
  }
  ul {
    padding-left: 5px;
    grid-area: 1/1/3/4;
    list-style: none;
    li {
      padding: 5px;
      font-size: 1.2rem;
      &::before {
        content: "➥ ";
        color: #1526bd;
      }
    }
  }
`;

const Discount = styled.div`
  height: 150px;
  width: 500px;
  display: flex;
  align-items: center;
  text-align: center;
  background-color: #dddd33;
  grid-area: 2/2/3/4;
  transform: rotate(350deg);
  margin-left: 100px;
  font-size: 2.2rem;
  outline: 2px solid #6006d6;
  animation: flashing 25s infinite linear;
  border-radius: 10px;
  @keyframes flashing {
    from {
      background-color: #95cf28;
    }
    25% {
      background-color: #91a51d;
    }
    50% {
      background-color: #799b2a;
    }
    75% {
      background-color: #bcdd28;
    }
    to {
      background-color: #a6dd26;
    }
  }
  @media (max-width: 1080px) {
    width: 300px;
    font-size: 1.5rem;
  }
  @media (max-width: 960px) {
    width: 220px;
    font-size: 1.3rem;
    height: 110px;
    transform: rotate(0deg);
    grid-area: 4/1/4/4;
    align-self: flex-start;
    padding: 5px;
    justify-self: center;
    margin-left: 0px;
  }
`;

const AboutTheft = styled.div`
  grid-area: -2/-1/-4 /2;
  width: 450px;
  height: 310px;
  background-color: #02ccaf;
  justify-self: flex-end;
  align-self: center;
  margin-right: 20px;
  border-radius: 20px;
  margin-top: 200px;
  padding: 10px;
  font-size: 1.5rem;
  line-height: 2rem;
  z-index: 2;
  h3 {
    text-align: center;
    color: #6006d6;
  }
  button {
    width: 100%;
    margin-top: 10px;
    &:hover {
      border: 1px solid #1526bd;
      box-shadow: none;
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
  }

  @media (max-width: 960px) {
    grid-area: 4/1/4/5;
    margin-top: 170px;
    justify-self: center;
    margin-right: 0;
  }
  @media (max-width: 500px) {
    grid-area: 4/1/4/5;
    width: 330px;
    height: 420px;
    justify-self: center;
    margin-right: 0;
  }
`;

const RoadWish = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  grid-area: 5/1/5/4;
  justify-self: center;
  font-size: 3rem;
  font-family: fantasy;
  background: linear-gradient(to right, #c616cc 0%, #ab8ff8 50%, #c616cc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 960px) {
    font-size: 1.7rem;
  }
  @media (max-width: 500px) {
    font-size: 1.7rem;
    text-align: center;
  }
`;

const StuffPanel = styled.div`
  width: 215px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px;
  grid-area: 3/3;
  align-self: flex-end;
  justify-self: flex-end;
  margin-right: 20px;
  padding: 5px;
  @media (max-width: 960px) {
    grid-area: 2/1/2/4;
    align-self: flex-start;
    justify-self: center;
  }
`;

export const Main = () => {
  const navigate = useNavigate();
  const isAutorized = useAppSelector((state) => state.app.loginnedUser);

  return (
    <MainWrapper>
      <h1 style={{ gridArea: "1/1/1/4" }}>
        Welcome to BikeStories service Official Website
      </h1>
      <SliderWrapper>
        <h2> Look Out for our new Gallery &#11015;</h2>
        <Slider></Slider>
      </SliderWrapper>
      <InfoBlock>
        <ul>
          <li>
            About <strong>150</strong> our services in the World
          </li>
          <li>Big choise of the bikes</li>
          <li>
            Our specialists keep always all of our technique in perfect
            condition{" "}
          </li>
          <li>
            Low rental price and ease of pick up and drop off allows you to
            enjoy your trip without wasting time{" "}
          </li>
          <li>We can deliver our bikes, just call &#128222; to us </li>
          <li>You can easily book a bike using our application &#128242; </li>
          <li>
            <strong>Discount</strong> for regular customers
          </li>
        </ul>
      </InfoBlock>
      <Discount>
        Only in Summer 2022 <br></br>Taking 2 Bikes? Take 3rd for free!!!
      </Discount>
      <AboutTheft>
        <h3>ATTENSION!</h3>
        <p>
          Recently, cases of theft have become more frequent. That's why we
          opened a service to find hooligans and return bicycles. If you are in
          this situation,please press the button below and fill out a simple
          form.&#11015; <br></br>
          Let's help the world get a little better!
        </p>
        <Button
          name={"Report a thief"}
          color="#14c74a"
          onClick={() => navigate("/report")}
        ></Button>
      </AboutTheft>
      {isAutorized.id !== null ? (
        <StuffPanel>
          <Button
            color="#02CCAF"
            name="Archieve"
            onClick={() => navigate("/archieve")}
          ></Button>
          <Button
            color="#02CCAF"
            name="Stuff"
            onClick={() => navigate("/officers")}
          ></Button>
        </StuffPanel>
      ) : null}

      <RoadWish>Have a good road and interesting stories!</RoadWish>
    </MainWrapper>
  );
};
