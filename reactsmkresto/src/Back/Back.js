import React from "react";
import Nav from "./Nav";
import Side from "./Side";
import Main from "./Main";
import Footer from "./Footer";
import { Redirect } from "react-router-dom";

const Back = () => {
  //console.log(sessionStorage.getItem("token") )
  if ((sessionStorage.getItem("token") === "undefined") || (sessionStorage.getItem("token") === null)) {
    return <Redirect to="login" />;
  }
  return (
    <div>
      <div className="row mb-4 mt-2">
        <div className="col-12">
          <Nav />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <Side />
        </div>
        <div className="col-9">
          <Main />
        </div>
      </div>
      <div className="row">
        <Footer />
      </div>
    </div>
  );
};

export default Back;
