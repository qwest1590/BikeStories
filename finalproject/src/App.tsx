import React from "react";
import { Header } from "./components/Header/Header";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { Main } from "./components/Main.tsx/Main";
import { Footer } from "./components/Footer/Footer";
import background from "./images/bicycleRiding.jpg";
const colors = {
  lightblue: "#3a9ad6",
  darkblue: "#1526BD",
  purple: "#6006D6",
  pink: "#C616CC",
  lazure: "#02CCAF",
};

const AppWrapper = styled.div`
  @font-face {
    font-family: "Roboto", sans-serif;
    src: url("./fonts/Roboto-Regular.ttf");
    font-style: normal;
    font-weight: normal;
  }
  @font-face {
    font-family: "Roboto", sans-serif;
    src: url("./fonts/Roboto-Italic.ttf");
    font-style: italic;
    font-weight: 700;
  }
  * {
    font-family: "Roboto", sans-serif;
  }
  margin: 0;
  padding: 0;
  li,
  p,
  ul,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }
  box-sizing: border-box;
  position: relative;
  z-index: 1;
`;

const Background = styled.img`
  opacity: 0.1;
  position: absolute;
  height: 100%;
  width: 100%;
`;

function App() {
  return (
    <AppWrapper>
      <Background src={background} alt="background"></Background>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
      <Routes>
        <Route path="/" element={<AppWrapper />} />
        <Route path="/login" />
      </Routes>
    </AppWrapper>
  );
}

export default App;
