import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import background from "./images/bicycleRiding.jpg";
import { Registration } from "./components/pages/Registration/Registration";
import { Home } from "./components/pages/Home/Home";
import { ReportPage } from "./components/pages/ReportPage/ReportPage";
import {
  ITheft,
  TheftArchive,
} from "./components/pages/TheftArchive/TheftArchive";
import { IOfficer, Officers } from "./components/pages/Officers/Officers";
import { useAppSelector } from ".";
import { OfficerDetail } from "./components/pages/OfficerDetail/OfficerDetail";
import { TheftDetail } from "./components/pages/TheftDetail/TheftDetail";
import { ErrorPage } from "./components/pages/ErrorPage/ErrorPage";

// const colors = {
//   lightblue: "#3a9ad6",
//   darkblue: "#1526BD",
//   purple: "#6006D6",
//   pink: "#C616CC",
//   lazure: "#02CCAF",
// };

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

export const Background = styled.img`
  opacity: 0.1;
  position: absolute;
  height: 100%;
  width: 100%;
  pointer-events: none;
`;

function App() {
  const officerOnEdit: IOfficer = useAppSelector(
    (state) => state.data.officerOnEdit
  );
  const caseOnEdit: ITheft = useAppSelector((state) => state.data.caseOnEdit);
  return (
    <AppWrapper>
      <Background src={background} alt="background"></Background>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/cases" element={<TheftArchive />} />
        <Route path="/officers" element={<Officers />} />
        <Route
          path={`/officers/:id`}
          element={<OfficerDetail {...officerOnEdit} />}
        />
        <Route path={`/cases/:id`} element={<TheftDetail {...caseOnEdit} />} />
        <Route path={"*"} element={<ErrorPage />} />
      </Routes>
    </AppWrapper>
  );
}

export default App;
