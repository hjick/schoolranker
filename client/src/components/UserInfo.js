import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DropdownContent = styled.div`
  display: none;
  border-radius: 10px;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 80px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  a {
    border-radius: 10px;
    color: #424242;
    font-size: 0.8rem;
    padding: 1rem 1rem;
    display: block;
    &:hover {
      background-color: #eeeeee;
    }
  }
  button {
    border: none;
    border-radius: 10px;
    background-color: #f9f9f9;
    font-size: 0.8rem;
    padding: 0.8rem 1rem;
    text-decoration: none;
    display: block;
    &:hover {
      background-color: #eeeeee;
      cursor: pointer;
    }
  }
`;

const UserInfo = () => {
  const logoutHandler = () => {
    setIsLoggingOut(true);
    axios.get("/api/users/logout").then((response) => {
      if (response.status === 200) {
        setIsLoggingOut(false);
        history.push("/loginpage");
      } else {
        setIsLoggingOut(false);
        alert("다시 시도해주세요 !");
      }
    });
  };

  return (
    <User>
      <FontAwesomeIcon icon="user-circle" size="2x" />
      <DropdownContent>
        <Link to="/userinfo">내 정보</Link>
        <button type="button" onClick={logoutHandler}>
          로그아웃
        </button>
      </DropdownContent>
    </User>
  );
};

export default UserInfo;
