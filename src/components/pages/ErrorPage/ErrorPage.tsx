import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ErrorPageWrapper = styled.div`
  height: 100vh;
`;

const ErrorInfo = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
  padding-top: 150px;
  h1 {
    padding: 5px;
    strong {
      color: red;
    }
  }
  article {
    padding: 10px;
    text-align: center;
    font-size: 1.2rem;
  }
  a {
    margin-top: 100px;
    font-size: 2rem;
    :visited {
      color: #1e48bb;
    }
    :hover {
      color: #6006d6;
    }
  }
`;

export const ErrorPage = () => {
  return (
    <ErrorPageWrapper>
      <ErrorInfo>
        <h1>
          <strong>Error 404:</strong> <br></br> Page not Found
        </h1>
        <article>
          Seems like you missed with url Path, but you can easy redirect to
          mainPage by Link below
        </article>
        <Link to="/">MainPage</Link>
      </ErrorInfo>
    </ErrorPageWrapper>
  );
};
