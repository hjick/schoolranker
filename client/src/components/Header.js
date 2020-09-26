import React, { useState } from "react";
import styled from "styled-components";
import "../index.css";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";

const HeaderTag = styled.header`
  font-size: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  height: 48px;
  font-weight: 400;
  background-color: #2fbaa5;
  color: #fff;
  border-bottom: 1px solid #fff;
`;

const Logo = styled.div`
  font-family: "Do Hyeon", sans-serif;
  /* background-color: #5c5c5e; */
  height: 48px;
  line-height: 48px;
  font-size: 1.5rem;
  padding: 0 2rem 0 1rem;
`;

const List = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  height: 48px;
  line-height: 48px;
  padding-right: 1rem;
  padding-left: 1rem;
  border-bottom: 3px solid #fff;
`;
const FIFA = styled.li`
  padding-right: 1rem;
  padding-left: 1rem;

  &:hover {
    cursor: pointer;
  }
`;
const BATTLE = styled(FIFA)``;
const LoginBtn = styled(Link)`
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  background-color: #5c5c5e;
  color: #fff;
  position: absolute;
  right: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const User = styled.div`
  display: inline-block;
  position: absolute;
  right: 1.5rem;
  &:hover {
    cursor: pointer;
    div {
      display: block;
    }
  }
`;

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

// 나중에 주변 쪼금 뿌옇고 가운데만 보이게
const SpinnerContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 90%;
  top: 88px;
  left: 0px;
  background-color: #fff;
  z-index: 2;
`;

const SpinnerBox = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const Thumbnail = styled.div`
  /* position: relative;
  top: 8px; */
  width: 42px;
  height: 42px;
  border: 2px #fff solid;
  padding: 1rem;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${(props) => props.src});
`;

const Header = ({ history }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const user = useSelector((state) => state.user);
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

  if (user.userData && user.userData.isLoggedIn) {
    return (
      <>
        <HeaderTag>
          <Logo>
            <Link to="/">School Ranker</Link>
          </Logo>
          {/* <img src={`${process.env.PUBLIC_URL}/img/logo.png`} width="100px" /> */}
          <List>
            <Item>League Of Legend</Item>
            <FIFA onClick={() => alert("comming soon...")}>FIFA ONLINE 4</FIFA>
            <BATTLE onClick={() => alert("comming soon...")}>
              배틀그라운드
            </BATTLE>
          </List>

          <User>
            {user.userData.thumbnail ? (
              <Thumbnail src={user.userData.thumbnail} />
            ) : (
              // <img src={user.userData.thumbnail} />
              <FontAwesomeIcon icon="user-circle" size="2x" />
            )}

            <DropdownContent>
              <Link to={`/userprofile`}>내 정보</Link>
              <button type="button" onClick={logoutHandler}>
                로그아웃
              </button>
            </DropdownContent>
          </User>

          {/* <LoginBtn type="button" onClick={logoutHandler}>
            로그아웃
          </LoginBtn> */}
        </HeaderTag>
        {isLoggingOut && (
          <SpinnerContainer>
            <SpinnerBox>
              <PacmanLoader
                size={45}
                color={"#F7F700"}
                loading={isLoggingOut}
              />
            </SpinnerBox>
          </SpinnerContainer>
        )}
      </>
    );
  } else {
    return (
      <>
        <HeaderTag>
          <Logo>
            <Link to="/">School Ranker</Link>
          </Logo>
          <List>
            <Item>League Of Legend</Item>
            <FIFA onClick={() => alert("comming soon...")}>FIFA ONLINE 4</FIFA>
            <BATTLE onClick={() => alert("comming soon...")}>
              배틀그라운드
            </BATTLE>
          </List>

          <LoginBtn to="/loginpage" type="button">
            로그인
          </LoginBtn>
        </HeaderTag>
      </>
    );
  }
};

export default withRouter(Header);
