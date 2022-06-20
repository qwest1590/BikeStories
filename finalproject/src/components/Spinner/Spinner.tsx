import React from "react";
import styled from "styled-components";

const LoadingSpinner = styled.div`
  width: 23px;
  height: 23px;
  border: 10px solid #3a9ad6;
  border-top: 10px solid #02ccaf;
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Spinner = () => {
  return (
    <>
      <LoadingSpinner></LoadingSpinner>
    </>
  );
};
