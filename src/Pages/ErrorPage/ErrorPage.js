import React from "react";
import "./ErrorPage.css";
import error from "../../assets/error.png";
const ErrorPage = () => {
  return (
    <>
      <main className="error-img-container">
        <img src={error} alt="404 img" />
      </main>
    </>
  );
};

export default ErrorPage;
