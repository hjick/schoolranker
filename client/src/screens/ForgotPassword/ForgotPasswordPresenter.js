import React from "react";
import styled from "styled-components";
import PacmanLoader from "react-spinners/PacmanLoader";

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
  padding: 2rem 2rem;
  margin: 3rem auto;
  box-shadow: 2px 5px 0px rgba(0, 0, 0, 0.1);
`;
const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 0;
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
const Label = styled.label`
  display: inline-block;
  color: #616161;
  font-size: 0.9rem;
  font-weight: 400;
  width: 100%;
  padding-left: 0.2rem;
`;
const InvalidMsg = styled.div`
  margin: -1rem 0 1.5rem;
  padding-left: 0.2rem;
  color: #e74c3c;
  font-size: 0.8rem;
`;

const SpinnerBox = styled.div`
  display: inline-block;
  margin-left: 1.1rem;
  margin-bottom: 0.5rem;
`;
const SpinnerBox2 = styled.div`
  margin: 1rem 2rem 32.8px 45%;
`;
const Logo = styled.div`
  font-family: "Do Hyeon", sans-serif;
  color: #35d0ba;
  font-size: 2.5rem;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const ForgotPasswordPresenter = ({
  name,
  email,
  newPassword,
  newPassword2,
  isSendEmail,
  isSending,
  authCodeValue,
  authCode,
  isAuthing,
  isCodeMatch,
  nameHandler,
  emailHandler,
  newPasswordHandler,
  newPassword2Handler,
  sendEmailHandler,
  authCodeValueHandler,
  compareAuthCode,
  isSubmitting,
  handleSubmit,
}) => {
  return (
    <Wrapper>
      <Container>
        <Logo>School RanKer</Logo>
        <h2 style={{ fontWeight: "400", textAlign: "center" }}>
          비밀번호 찾기
        </h2>
        <RegisterForm onSubmit={handleSubmit}>
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
            </div>
          )}
          {isCodeMatch && (
            <>
              <Label htmlFor="newPassword">새 비밀번호</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="어렵게 8자리 이상"
                value={newPassword}
                onChange={newPasswordHandler}
                required
              ></Input>
              {!(newPassword === "") &&
                newPassword.length < 8 && ( // 비밀번호 Validation 체크
                  <InvalidMsg>비밀번호는 8자리 이상이어야 해요 !</InvalidMsg>
                )}
              <Label htmlFor="newPassword2">새 비밀번호 확인</Label>
              <Password2Input
                id="newPassword2"
                type="password"
                placeholder="비밀번호 확인"
                value={newPassword2}
                onChange={newPassword2Handler}
                required
                isMatch={newPassword === newPassword2}
              ></Password2Input>
              {!(newPassword2 === "") &&
                !(newPassword === newPassword2) && ( // 비밀번호 확인 Validation 체크
                  <InvalidMsg>비밀번호를 확인해주세요 !</InvalidMsg>
                )}
            </>
          )}

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
              disabled={
                !(name && email && newPassword && newPassword2 && isCodeMatch)
              }
            >
              비밀번호 변경 완료
            </RegisterBtn>
          )}
        </RegisterForm>
      </Container>
    </Wrapper>
  );
};

export default ForgotPasswordPresenter;
