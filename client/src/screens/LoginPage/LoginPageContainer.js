import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import LoginPagePresenter from "./LoginPagePresenter";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../_actions/user_action";

const LoginPageContainer = ({ history }) => {
  const dispatch = useDispatch();
  const view = useSelector((state) => state.view);
  const { showSidebar } = view;

  const [isLogging, setIsLogging] = useState(false);

  const [email, setEmail] = useState("");
  const handleEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const [password, setPassword] = useState("");
  const handlePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLogging(true);
    let body = {
      email,
      password,
    };

    dispatch(loginUser(body)).then((response) => {
      setIsLogging(false);
      const {
        payload: { loginSuccess, msg },
      } = response;
      if (loginSuccess) {
        history.push("/");
      } else {
        alert(msg);
      }
    });
  };

  return (
    <LoginPagePresenter
      email={email}
      password={password}
      isLogging={isLogging}
      handleEmail={handleEmail}
      handlePassword={handlePassword}
      handleSubmit={handleSubmit}
      showSidebar={showSidebar}
    />
  );
};

export default withRouter(LoginPageContainer);
