import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useSelector } from "react-redux";

export default (SpecificComponent, option, adminRoute = null) => {
  // null => 아무나 출입이 가능한 페이지
  // true => 로그인한 유저만 출입이 가능한 페이지
  // false => 로그인한 유저는 출입이 불가능한 페이지

  const AuthenticationCheck = ({ history }) => {
    const user = useSelector((state) => state.user);

    const { summoner, school } = user;
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((response) => {
        // 로그인 X
        if (!response.payload.isLoggedIn) {
          if (option) {
            history.push("/loginpage");
          }
        } else {
          // 로그인 O
          if (option === false) {
            history.push("/");
          }
        }
      });
    }, [summoner, school, dispatch]);
    return <SpecificComponent />;
  };

  return withRouter(AuthenticationCheck);
};
