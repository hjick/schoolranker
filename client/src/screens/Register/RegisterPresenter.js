import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PacmanLoader from "react-spinners/PacmanLoader";
import kakao from "../../img/kakao.png";
import naver from "../../img/naver.png";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Container = styled.div`
  width: 450px;
  height: 100%;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
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

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 0;
`;
const Input = styled.input`
  width: 100%;
  height: 40px;
  font-size: 1rem;
  font-weight: 400;
  border: none;
  color: #424242;
  border-bottom: 1.1px solid #bdbdbd;
  margin-bottom: 1.5rem;
  border-radius: 0;
  padding-left: 0.2rem;
  &:focus,
  &:valid {
    border-bottom: 1.2px solid #35d0ba;
  }
  &::placeholder {
    font-weight: 300;
    color: #757575;
  }
`;
const NameInput = styled(Input)`
  &:not([value=""]) {
    border-bottom: ${(props) =>
      props.isValid ? "1.2px solid #35d0ba" : "1.2px solid #e74c3c"};
  }
`;
const EmailInput = styled(Input)`
  width: 75%;
  appearance: none;
  &[readOnly] {
    border-bottom: 1.2px solid #35d0ba;
    color: #616161;
    background-color: #c7f0eb;
    border-radius: 5px 5px 0 0;
  }
`;

const AuthCodeInput = styled.input`
  width: 75%;
  font-size: 1rem;
  height: 40px;
  border: none;
  border-bottom: 1.1px solid #bdbdbd;
  padding-left: 0.2rem;
  &[value] {
    letter-spacing: 4px;
  }
  &::placeholder {
    letter-spacing: normal;
    font-size: 0.8rem;
  }
  &[readOnly] {
    border-bottom: 1.2px solid #35d0ba;
    color: #bdbdbd;
  }
`;
const Password2Input = styled(Input)`
  &:focus {
    border-bottom: ${(props) =>
      props.isMatch ? "1.2px solid #35d0ba" : "1.2px solid #e74c3c"};
  }
  &:not([value=""]) {
    border-bottom: ${(props) =>
      props.isMatch ? "1.2px solid #35d0ba" : "1.2px solid #e74c3c"};
  }
`;
const SendEmailBtn = styled.button`
  width: 20%;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #35d0ba;
  color: #fff;
  height: 36px;
  margin-left: 1rem;
  &:hover {
    background-color: #30c2ad;
    cursor: pointer;
  }
  &[disabled] {
    background-color: #eeeeee;
    color: #bdbdbd;
    cursor: default;
  }
`;
const AuthCodeBtn = styled(SendEmailBtn)``;
// const TimerSpan = styled.span`
//   position: relative;
//   bottom: 28px;
//   left: 240px;
// `;
const Label = styled.label`
  display: inline-block;
  color: #616161;
  font-size: 0.9rem;
  font-weight: 400;
  width: 100%;
  padding-left: 0.2rem;
`;

const RegisterBtn = styled.button`
  border: none;
  border-radius: 5px;
  width: 100%;
  padding: 0.7rem 0;
  font-size: 1rem;
  color: #fff;
  background-color: #35d0ba;
  margin: 1.5rem 0 1.5rem;
  &:hover {
    background-color: #30c2ad;
    cursor: pointer;
  }
  &[disabled] {
    background-color: #eeeeee;
    color: #bdbdbd;
    cursor: default;
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

const ToLogin = styled.div`
  font-size: 0.9rem;
  text-align: center;
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
const InvalidMsg = styled.div`
  margin: -1rem 0 1.5rem;
  padding-left: 0.2rem;
  color: #e74c3c;
  font-size: 0.8rem;
`;
// const ValidMsg = styled.span`
//   margin: -1rem 0 1.5rem;
//   padding-left: 0.2rem;
//   color: #35d0ba;
//   font-size: 0.8rem;
//   font-weight: 400;
// `;
const ListContainer = styled.div``;
const List = styled.ul`
  margin-top: -0.5rem;
`;
const Item = styled.li`
  display: flex;
  padding-left: 0.5rem;
  align-items: center;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  height: 42px;
  margin-bottom: 0.5rem;
  color: #424242;
  font-size: 0.8rem;
  &:hover {
    background-color: #35d0ba;
    border: 1px solid #35d0ba;
    cursor: pointer;
    color: #fff;
    font-weight: 400;
  }
  &:focus {
    background-color: #35d0ba;
    border: 1px solid #35d0ba;
  }
`;

const SpinnerBox = styled.div`
  display: inline-block;
  margin-left: 1.1rem;
  margin-bottom: 0.5rem;
`;
const SpinnerBox2 = styled.div`
  margin: 1rem 2rem 32.8px 45%;
`;

const Register = ({
  handleSubmit,
  name,
  nameHandler,
  email,
  emailHandler,
  isSendEmail,
  isSending,
  sendEmailHandler,
  authCodeValue,
  authCodeValueHandler,
  isCodeMatch,
  isAuthing,
  compareAuthCode,
  password,
  passwordHandler,
  password2,
  password2Handler,
  summoner,
  summonerInput,
  summonerHandler,
  isValidSummoner,
  isSearchingSummoner,
  searchSummoner,
  school,
  schoolHandler,
  isSearchingSchool,
  searchSchool,
  schoolLists,
  regionHandler,
  isSubmitting,
  isValidSchool,
}) => {
  return (
    <Wrapper>
      <Container>
        <Logo>School RanKer</Logo>
        {/* <img
          src={`${process.env.PUBLIC_URL}/img/logo.png`}
          style={{ width: "256px", display: "block", margin: "0 auto" }}
        /> */}

        <Subtitle>SNS 간편 가입</Subtitle>
        <SNSContainer>
          <FacebookLogin href="/api/users/authfacebook">
            <Icon icon={["fab", "facebook-square"]} />
            페이스북으로 회원가입
          </FacebookLogin>

          <KakaoLogin href="/api/users/authkakao">
            <img src={kakao} width="20px" height="20px" alt="kakaoLogin" />
            카카오로 회원가입
          </KakaoLogin>

          <NaverLogin href="/api/users/authnaver">
            <img src={naver} width="42px" height="42px" alt="naverLogin" />
            네이버로 회원가입
          </NaverLogin>
        </SNSContainer>

        <LineContainer>
          <hr /> <span> 또는 </span> <hr />
        </LineContainer>

        <Subtitle>이메일로 가입하기</Subtitle>
        <RegisterForm onSubmit={handleSubmit} autoComplete="off">
          <Label htmlFor="name">이름</Label>
          <NameInput
            id="name"
            type="text"
            placeholder="ex) 이현직"
            value={name}
            onChange={nameHandler}
            required
            isValid={name.length < 8}
          ></NameInput>
          {!(name.length < 8) && <InvalidMsg>이름이 너무 길어요 !</InvalidMsg>}

          <div>
            <Label htmlFor="email">이메일</Label>
            <EmailInput
              id="email"
              type="email"
              placeholder="ex) schoolranker0@gmail.com"
              value={email}
              onChange={emailHandler}
              required
              readOnly={isSendEmail}
            ></EmailInput>

            {isSending ? ( /// 이메일 요청 보내는중
              <SpinnerBox>
                <PacmanLoader size={17} color={"#F7F700"} loading={isSending} />
              </SpinnerBox>
            ) : (
              <SendEmailBtn
                type="button"
                onClick={sendEmailHandler}
                disabled={!email || isSendEmail}
              >
                인증
              </SendEmailBtn>
            )}
          </div>
          {isSendEmail && ( /// 이메일 요청 완료 , 인증번호 입력창
            <div style={{ margin: "-1rem 0 1.5rem" }}>
              <AuthCodeInput
                type="text"
                placeholder="인증번호 6자리를 입력해주세요 !"
                value={authCodeValue}
                onChange={authCodeValueHandler}
                readOnly={isCodeMatch}
                maxLength="6"
              ></AuthCodeInput>

              {isAuthing ? (
                <SpinnerBox>
                  <PacmanLoader
                    size={16}
                    color={"#F7F700"}
                    loading={isAuthing}
                  />
                </SpinnerBox>
              ) : (
                <AuthCodeBtn
                  onClick={compareAuthCode}
                  type="button"
                  valid={authCodeValue}
                  disabled={!authCodeValue || isCodeMatch}
                >
                  확인
                </AuthCodeBtn>
              )}

              {/* <TimerSpan>
                {isCodeMatch ? (
                  <span
                    style={{
                      marginLeft: "-.6rem",
                      color: "#35d0ba",
                      fontWeight: "600",
                    }}
                  >
                    인증완료
                  </span>
                ) : (
                  "00:00"
                )}
              </TimerSpan> */}
            </div>
          )}

          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            placeholder="어렵게 8자리 이상"
            value={password}
            onChange={passwordHandler}
            required
          ></Input>
          {!(password === "") &&
            password.length < 8 && ( // 비밀번호 Validation 체크
              <InvalidMsg>비밀번호는 8자리 이상이어야 해요 !</InvalidMsg>
            )}
          <Label htmlFor="password2">비밀번호 확인</Label>
          <Password2Input
            id="password2"
            type="password"
            placeholder="비밀번호 확인"
            value={password2}
            onChange={password2Handler}
            required
            isMatch={password === password2}
          ></Password2Input>
          {!(password2 === "") &&
            !(password === password2) && ( // 비밀번호 확인 Validation 체크
              <InvalidMsg>비밀번호를 확인해주세요 !</InvalidMsg>
            )}

          <div style={{ marginTop: "1rem" }}>
            <Label style={{ color: "#30c2ad" }}>롤 소환사명</Label>
            <EmailInput
              type="text"
              value={summonerInput}
              onChange={summonerHandler}
              required
              placeholder="ex) Hide on bush"
              readOnly={isValidSummoner}
            ></EmailInput>

            {isSearchingSummoner ? (
              <SpinnerBox>
                <PacmanLoader
                  size={17}
                  color={"#F7F700"}
                  loading={isSearchingSummoner}
                />
              </SpinnerBox>
            ) : (
              <SendEmailBtn
                onClick={searchSummoner}
                type="button"
                disabled={!summonerInput || isValidSummoner}
              >
                검색
              </SendEmailBtn>
            )}
          </div>
          {/* {isValidSummoner && <ValidMsg>인증 OK !</ValidMsg>} */}

          <div style={{ marginTop: "1rem" }}>
            <Label style={{ color: "#30c2ad" }}>우리 학교</Label>
            <EmailInput
              type="text"
              value={school}
              onChange={schoolHandler}
              required
              placeholder="ex) 동작고등학교"
              readOnly={isValidSchool}
            ></EmailInput>

            {isSearchingSchool ? ( // 학교 검색요청 보냈을 때
              <SpinnerBox>
                <PacmanLoader
                  size={17}
                  color={"#F7F700"}
                  loading={isSearchingSchool}
                />
              </SpinnerBox>
            ) : (
              <SendEmailBtn
                onClick={searchSchool}
                type="button"
                disabled={!school || isValidSchool}
              >
                검색
              </SendEmailBtn>
            )}

            {schoolLists &&
              schoolLists.length > 0 && ( // 학교 검색 완료 했을 때
                <ListContainer>
                  <List>
                    {schoolLists.map((schoolList) => (
                      <Item
                        key={schoolList.id}
                        onClick={regionHandler}
                        name={schoolList.region}
                      >
                        {schoolList.schoolName}, {schoolList.address}
                      </Item>
                    ))}
                  </List>
                </ListContainer>
              )}
          </div>

          {isSubmitting ? ( // 회원가입 요청 중
            <SpinnerBox2>
              <PacmanLoader
                size={20}
                color={"#F7F700"}
                loading={isSubmitting}
              />
            </SpinnerBox2>
          ) : (
            <RegisterBtn
              type="submit"
              disabled={!(name && email && password && password2)}
            >
              회원가입
            </RegisterBtn>
          )}
        </RegisterForm>
        <ToLogin>
          <span>이미 아이디가 있다면?</span>
          <Link to="/loginpage">로그인</Link>
        </ToLogin>
      </Container>
    </Wrapper>
  );
};

export default Register;
