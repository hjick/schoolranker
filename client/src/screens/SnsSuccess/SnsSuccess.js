import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
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
  color: #757575;
`;

const Logo = styled.div`
  color: #35d0ba;
  font-size: 4rem;
  margin-bottom: 2.5rem;
`;
const SubTitle = styled.div`
  font-size: 1.7rem;
  text-align: center;
  margin-bottom: 2.5rem;
`;
const SubLogo = styled.span`
  font-size: 2rem;
`;
const Text = styled.div`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 2.5rem;
`;
const ToLoginBtn = styled(Link)`
  border-radius: 4px;
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
const SubText = styled.div`
  margin: 2rem 0 0;
  span {
    font-size: 2rem;
    color: #febf63;
  }
`;

const SnsSuccess = () => {
  return (
    <Wrapper>
      <Container>
        <Logo>SchoolRanKer</Logo>

        <SubTitle>회원가입 완료 !</SubTitle>
        <Text>
          <SubLogo>스쿨랭커</SubLogo>와 함께 하게 되신 것을 환영해요 !
          <SubText>
            <span>소환사 </span>랑 <span>학교 </span>를 등록해주세요 !
          </SubText>
        </Text>

        <ToLoginBtn to="/userprofile">등록하러 가기</ToLoginBtn>
      </Container>
    </Wrapper>
  );
};

export default SnsSuccess;
