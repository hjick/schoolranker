import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MyHelmet from "components/MyHelmet";

const Wrapper = styled.div`
  height: 85vh;
  width: 100vw;
  padding-bottom: 3rem;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-family: "Do Hyeon", sans-serif;
`;

// const Logo = styled.div`
//   color: #35d0ba;
//   font-size: 4rem;
//   margin-bottom: 2.5rem;
// `;
const SubTitle = styled.div`
  font-size: 1.7rem;
  text-align: center;
  margin-bottom: 2.5rem;
  color: #616161;
`;
const SubLogo = styled.span`
  font-size: 2rem;
  color: #616161;
`;
const Text = styled.p`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 2.5rem;
  color: #616161;
`;
const ToLoginBtn = styled(Link)`
  border-radius: 5px;
  height: 48px;
  width: 40%;
  background-color: #febf63;
  color: #fff;
  line-height: 48px;
  font-size: 1.3rem;
  text-align: center;
  &:hover {
    background-color: #f2b65e;
  }
`;

const RegisterSuccess = () => {
  return (
    <>
      <MyHelmet title="회원가입 완료 ! | School Ranker" />

      <Wrapper>
        <Container>
          {/* <Logo>School RanKer</Logo> */}
          <img
            style={{ width: "420px", marginBottom: "2rem" }}
            src={`${process.env.PUBLIC_URL}/img/logo.png`}
            alt="logo"
          />

          <SubTitle>회원가입 완료 !</SubTitle>
          <Text>
            <SubLogo>스쿨랭커</SubLogo>와 함께 하게 되신 것을 환영해요 !
          </Text>

          <ToLoginBtn to="/loginpage">로그인하러 가기</ToLoginBtn>
        </Container>
      </Wrapper>
    </>
  );
};

export default RegisterSuccess;
