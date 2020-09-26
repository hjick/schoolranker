import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import kakao from "../../img/kakao.png";
import naver from "../../img/naver.png";

import PacmanLoader from "react-spinners/PacmanLoader";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* Sidebar */
  transition: margin-left 0.3s ease;
  margin-left: ${({ showSidebar }) => showSidebar && "50px"};
`;

const Container = styled.div`
  width: 450px;
  height: 100%;
  border: 1px solid #bdbdbd;
  padding: 2rem 2rem;
  margin: 3rem auto;
  box-shadow: 2px 5px 0px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-family: "Do Hyeon", sans-serif;
  color: #35d0ba;
  font-size: 2.5rem;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const LoginForm = styled.form`
  margin: 1rem auto 0;
`;

const Input = styled.input`
  width: 100%;
  font-size: 1rem;
  border: none;
  border-bottom: 1.1px solid #bdbdbd;
  padding-bottom: 0.5rem;
  margin-bottom: 1.7rem;
  border-radius: 0;
  &:focus {
    border-bottom: 1.3px solid #35d0ba;
  }
`;

const LoginBtn = styled.button`
  border: none;
  border-radius: 5px;
  width: 100%;
  padding: 0.7rem 0;
  font-weight: 700;
  font-size: 1rem;
  color: #fff;
  background-color: #35d0ba;
  margin: 1.5rem 0 0;
  &:hover {
    cursor: pointer;
  }
  &[disabled] {
    background-color: #eeeeee;
    color: #bdbdbd;
    cursor: default;
  }
`;

const SignUp = styled.div`
  font-size: 0.9rem;
  text-align: center;
  margin: 1rem 0;
  span {
    margin-right: 0.5rem;
    font-weight: 400;
    color: #616161;
  }
  a {
    color: #35d0ba;
    font-weight: 500;
    text-decoration: underline;
    font-size: 1rem;
  }
`;

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AutoLoginContainer = styled.div`
  display: inline-block;
  label {
    margin-left: 0.3rem;
    color: #616161;
  }
`;

const ForgotInfo = styled.div`
  display: inline-block;
  a {
    margin: 0 0.5rem;
    font-size: 0.9rem;
    text-decoration: underline;
    color: #35d0ba;
  }
`;

const Subtitle = styled.h2`
  font-size: 1rem;
  margin: 2rem 0;
  font-weight: 400;
`;

const SNSContainer = styled.div`
  text-align: center;
  margin: 1rem 0 1.5rem;
`;

const LineContainer = styled.div`
  margin: 1rem 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  hr {
    width: 44%;
    display: inline-block;
    border: none;
    height: 0.5px;
    background-color: #e0e0e0;
  }
  span {
    color: #bdbdbd;
    font-size: 0.8rem;
    display: inline-block;
    margin: 0.5rem;
  }
`;

const FacebookLogin = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4267b2;
  color: #fff;
  border: none;
  width: 100%;
  height: 48px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 5px;
`;
const KakaoLogin = styled(FacebookLogin)`
  background-color: #fee500;
  color: rgba(0, 0, 0, 0.85);
  margin-top: 0.6rem;
  img {
    margin-right: 0.5rem;
  }
`;
const NaverLogin = styled(FacebookLogin)`
  background-color: #1ec800;
  color: #fff;
  margin-top: 0.6rem;
  img {
    margin-right: -0.1rem;
  }
`;
const Icon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  margin-right: 0.5rem;
`;
const SpinnerBox = styled.div`
  margin: 32.8px 2rem 32.8px 45%;
`;

const LoginPage = ({
  email,
  password,
  isLogging,
  handleEmail,
  handlePassword,
  handleSubmit,
  showSidebar,
}) => {
  return (
    <Wrapper showSidebar={showSidebar}>
      <Container>
        <Logo>School RanKer</Logo>
        <Subtitle>이메일로 로그인</Subtitle>
        <LoginForm onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="이메일 주소"
            value={email}
            onChange={handleEmail}
            required
          ></Input>
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePassword}
            required
          ></Input>

          <SpaceBetween>
            <AutoLoginContainer>
              <input type="checkbox" id="autoLogin" />
              <label htmlFor="autoLogin">로그인 기억하기</label>
            </AutoLoginContainer>
            <ForgotInfo>
              {/* <Link to="/loginpage/id">ID 찾기</Link> */}
              <Link to="/forgotpassword">비밀번호 찾기</Link>
            </ForgotInfo>
          </SpaceBetween>

          {isLogging ? (
            <SpinnerBox>
              <PacmanLoader size={20} color={"#F7F700"} loading={isLogging} />
            </SpinnerBox>
          ) : (
            <LoginBtn
              type="submit"
              valid={email && password}
              disabled={!(email && password)}
            >
              로그인
            </LoginBtn>
          )}
        </LoginForm>
        <LineContainer>
          <hr /> <span> 또는 </span> <hr />
        </LineContainer>
        <Subtitle>SNS로 로그인</Subtitle>
        <SNSContainer>
          {/* <button onClick={loginByFacebook}>페이스북으로 로그인</button> */}
          <FacebookLogin href="/api/users/authfacebook">
            <Icon icon={["fab", "facebook-square"]} />
            페이스북으로 로그인
          </FacebookLogin>

          <KakaoLogin href="/api/users/authkakao">
            <img src={kakao} width="20px" height="20px" alt="kakaoLogin" />
            카카오로 로그인
          </KakaoLogin>

          <NaverLogin href="/api/users/authnaver">
            <img src={naver} width="42px" height="42px" alt="naverLogin" />
            네이버로 로그인
          </NaverLogin>
        </SNSContainer>

        <SignUp>
          <span>아직도 등록을 안했다고?</span>
          <Link to="/register">회원가입</Link>
        </SignUp>
      </Container>
    </Wrapper>
  );
};

export default LoginPage;
