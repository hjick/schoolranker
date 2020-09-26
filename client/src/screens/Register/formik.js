import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Facebook from "components/Facebook";
import { useDispatch, connect } from "react-redux";
import {
  registerUser,
  authEmail,
  registerSummoner,
} from "../../_actions/user_action";

import { useFormik } from "formik";
import * as Yup from "yup";
import ValidationSchema from "./ValidationSchema";

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
  font-weight: 300;
  border: none;
  border-bottom: 1.1px solid #bdbdbd;
  margin-bottom: 1.5rem;
  border-radius: 0;
  padding-left: 0.2rem;
  &:focus,
  &:valid {
    border-bottom: 1.2px solid #35d0ba;
  }
`;
const EmailInput = styled(Input)`
  appearance: none;
  &[readOnly] {
    border-bottom: 1.2px solid #35d0ba;
    color: #bdbdbd;
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
    cursor: pointer;
  }
  &[disabled] {
    background-color: #eeeeee;
    color: #bdbdbd;
    cursor: default;
  }
`;
const AuthCodeBtn = styled(SendEmailBtn)``;
const TimerSpan = styled.span`
  position: relative;
  bottom: 28px;
  left: 240px;
`;
const Label = styled.label`
  display: inline-block;
  font-size: 0.9rem;
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
  button {
    margin: 0.3rem 0;
  }
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

const Register = ({ history, user }) => {
  const dispatch = useDispatch();
  // console.log(sendEmail);

  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [authCodeValue, setAuthCodeValue] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isAuthCode, setIsAuthCode] = useState(false);
  // const [time, setTime] = useState(180);
  // Function

  const nameHandler = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const emailHandler = (e) => {
    const { value } = e.target;
    setEmail(value);
  };
  const passwordHandler = (e) => {
    const { value } = e.target;
    setPassword(value);
  };
  const password2Handler = (e) => {
    const { value } = e.target;
    setPassword2(value);
  };
  // const summonerHandler = (e) => {
  //   const { value } = e.target;
  //   setSummoner(value);
  // };
  // const schoolHandler = (e) => {
  //   const { value } = e.target;
  //   setSchool(value);
  // };

  // const startTimer = () => {
  //   let time = 180;
  //   let min = Math.floor(time / 60);
  //   let sec = Math.floor(time % 60);

  //   const interval = setInterval(() => {
  //     time = time - 1;
  //     clearInterval(interval);
  //   }, 1000);
  //   if (time < 0) {
  //     clearInterval(interval);
  //   }
  //   return `${`0${min}`}:${sec < 10 ? `0${sec}` : sec}`;
  // };

  // 이메일 인증
  const authEmailHandler = () => {
    let body = {
      email,
    };

    dispatch(authEmail(body)).then((response) => {
      const {
        payload: { success, msg, authCode },
      } = response;
      if (success) {
        alert(msg);
        setIsSendEmail(true);
        setAuthCode(authCode);
        // startTimer();
      } else {
        alert(msg);
      }
    });
  };

  const authCodeValueHandler = (e) => {
    const { value } = e.target;
    setAuthCodeValue(value);
  };

  const compareAuthCode = () => {
    if (authCodeValue === authCode) {
      alert("인증 OK !");
      setIsAuthCode(true);
    } else {
      alert("번호가 틀려요 !");
      setIsAuthCode(false);
      setAuthCodeValue("");
    }
  };
  // 회원가입 Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // if(password===password2) {

    // }

    let body = {
      email,
      password,
      name,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        history.push("/loginpage");
      } else {
        alert("회원가입에 실패했어요!");
      }
    });
  };

  // const searchSummoner = (e) => {
  //   e.preventDefault();

  //   let summonerInfo = {
  //     summoner,
  //   };

  //   dispatch(registerSummoner(summonerInfo)).then((response) => {
  //     console.log(response.payload.data);
  //   });
  // };

  // Formik Library
  const formik = useFormik({
    initialValues: {
      name,
      email,
      authCodeValue,
      password,
      password2,
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      let body = {
        email,
        password,
        name,
      };

      dispatch(registerUser(body)).then((response) => {
        if (response.payload.success) {
          history.push("/loginpage");
        } else {
          alert("회원가입에 실패했어요!");
        }
      });
    },
  });

  return (
    <Wrapper>
      <Container>
        <Logo>School RanKer</Logo>

        <Subtitle>SNS 간편가입</Subtitle>
        <SNSContainer>
          <Facebook btnTitle="페이스북으로 가입하기" />
          {/* <Kakao /> */}
        </SNSContainer>
        <LineContainer>
          <hr /> <span> 또는 </span> <hr />
        </LineContainer>

        <Subtitle>이메일로 가입하기</Subtitle>
        {/* <RegisterForm onSubmit={handleSubmit} autoComplete="off">
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            type="text"
            placeholder="이름"
            value={name}
            onChange={nameHandler}
            required
          ></Input>

          <div>
            <Label htmlFor="email">이메일</Label>
            <EmailInput
              style={{ width: "75%" }}
              id="email"
              type="email"
              placeholder="이메일"
              value={email}
              onChange={emailHandler}
              required
              readOnly={isSendEmail}
            ></EmailInput>

            <SendEmailBtn
              type="button"
              onClick={authEmailHandler}
              disabled={!email || isSendEmail}
            >
              인증
            </SendEmailBtn>
          </div>
          {isSendEmail && (
            <div style={{ margin: "-1rem 0 1.5rem" }}>
              <AuthCodeInput
                type="text"
                placeholder="인증번호 6자리를 입력해주세요 !"
                value={authCodeValue}
                onChange={authCodeValueHandler}
                readOnly={isAuthCode}
                maxLength="6"
              ></AuthCodeInput>

              <AuthCodeBtn
                onClick={compareAuthCode}
                type="button"
                valid={authCodeValue}
                disabled={!authCodeValue || isAuthCode}
              >
                확인
              </AuthCodeBtn>
              <TimerSpan>
                {isAuthCode ? (
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
              </TimerSpan>
            </div>
          )}

          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={passwordHandler}
            required
          ></Input>
          <Label htmlFor="password2">비밀번호 확인</Label>
          <Input
            id="password2"
            type="password"
            placeholder="비밀번호 확인"
            value={password2}
            onChange={password2Handler}
            required
          ></Input>

          <RegisterBtn
            type="submit"
            disabled={!(name && email && password && password2)}
          >
            회원가입
          </RegisterBtn>
        </RegisterForm> */}

        <form onSubmit={formik.handleSubmit}>
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            type="text"
            placeholder="이름"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />

          {formik.touched.name && formik.errors.name ? (
            <InvalidMsg>{formik.errors.name}111</InvalidMsg>
          ) : null}
          <Label htmlFor="email">이메일</Label>
          <EmailInput
            style={{ width: "75%" }}
            id="email"
            type="email"
            placeholder="이메일"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <SendEmailBtn
            type="button"
            onClick={authEmailHandler}
            disabled={!email || isSendEmail}
          >
            인증
          </SendEmailBtn>
          {formik.touched.email && formik.errors.email ? (
            <InvalidMsg>{formik.errors.email}</InvalidMsg>
          ) : null}

          <AuthCodeInput
            type="text"
            placeholder="인증번호 6자리를 입력해주세요 !"
            value={authCodeValue}
            onChange={authCodeValueHandler}
            readOnly={isAuthCode}
            maxLength="6"
          ></AuthCodeInput>
          <AuthCodeBtn
            onClick={compareAuthCode}
            type="button"
            valid={authCodeValue}
            disabled={!authCodeValue || isAuthCode}
          >
            확인
          </AuthCodeBtn>
          {formik.touched.authCodeValue && formik.errors.authCodeValue ? (
            <InvalidMsg>{formik.errors.authCodeValue}</InvalidMsg>
          ) : null}

          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />

          {formik.touched.password && formik.errors.password ? (
            <InvalidMsg>{formik.errors.password}</InvalidMsg>
          ) : null}

          <Label htmlFor="password2">비밀번호 확인</Label>
          <Input
            id="password2"
            type="password"
            placeholder="비밀번호 확인"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password2}
          />

          {formik.touched.password2 && formik.errors.password2 ? (
            <InvalidMsg>{formik.errors.password2}</InvalidMsg>
          ) : null}
          <RegisterBtn type="submit">회원가입</RegisterBtn>
        </form>

        <ToLogin>
          <span>이미 아이디가 있다면?</span>
          <Link to="/loginpage">로그인</Link>
        </ToLogin>
      </Container>
    </Wrapper>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Register);
