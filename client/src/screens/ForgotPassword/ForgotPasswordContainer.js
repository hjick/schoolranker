import React, { useState } from "react";
import ForgotPasswordPresenter from "./ForgotPasswordPresenter";
import axios from "axios";
import { withRouter } from "react-router-dom";

const ForgotPasswordContainer = ({ history }) => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [authCodeValue, setAuthCodeValue] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isAuthing, setIsAuthing] = useState(false);
  const [isCodeMatch, setIsCodeMatch] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameHandler = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const emailHandler = (e) => {
    const { value } = e.target;
    setEmail(value);
  };
  const newPasswordHandler = (e) => {
    const { value } = e.target;
    setNewPassword(value);
  };
  const newPassword2Handler = (e) => {
    const { value } = e.target;
    setNewPassword2(value);
  };
  const sendEmailHandler = async () => {
    setIsSending(true);

    let body = {
      name,
      email,
    };
    axios.post("/api/users/forgotpassword/check", body).then((response) => {
      const { data } = response;
      if (data !== null) {
        let body = {
          email,
        };

        axios
          .post("/api/users/forgotpassword/sendEmail", body)
          .then((response) => {
            setIsSending(false);
            const {
              data: { success, authCode },
            } = response;

            if (success) {
              alert("인증메일을 보냈어요 !");
              setIsSendEmail(true);
              setAuthCode(authCode);
            } else {
              alert("일치하는 회원이 없어요 !");
            }
          });
      } else {
        setIsSending(false);
        alert("일치하는 회원이 없어요 !");
      }
    });
  };

  const authCodeValueHandler = (e) => {
    const { value } = e.target;
    setAuthCodeValue(value);
  };

  const compareAuthCode = () => {
    setIsAuthing(true);
    let body = {
      authCodeValue,
      authCode,
    };

    axios.post("/api/users/authEmail", body).then((response) => {
      setIsAuthing(false);
      const {
        data: { isMatch },
      } = response;
      if (isMatch) {
        alert("인증 되었어요 !");
        setIsCodeMatch(true);
      } else {
        alert("인증코드를 다시 확인해주세요 !");
        setAuthCodeValue("");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    if (newPassword === newPassword2 && isCodeMatch) {
      let body = {
        email,
        newPassword,
      };
      axios
        .post("/api/users/forgotpassword/newpassword", body)
        .then((response) => {
          setIsSubmitting(false);
          const {
            data: { success },
          } = response;

          if (success) {
            alert("비밀번호 변경이 완료 되었어요 !");
            history.push("/loginpage");
          } else {
            alert("비밀번호 변경에 실패했어요 ..");
            history.push("/loginpage");
          }
        });
    } else if (!(newPassword === newPassword2)) {
      setIsSubmitting(false);
      alert("비밀번호가 일치하지 않아요 !");
    }
  };

  return (
    <ForgotPasswordPresenter
      name={name}
      email={email}
      newPassword={newPassword}
      newPassword2={newPassword2}
      isSendEmail={isSendEmail}
      isSending={isSending}
      authCodeValue={authCodeValue}
      authCode={authCode}
      isAuthing={isAuthing}
      isCodeMatch={isCodeMatch}
      isSubmitting={isSubmitting}
      nameHandler={nameHandler}
      emailHandler={emailHandler}
      newPasswordHandler={newPasswordHandler}
      newPassword2Handler={newPassword2Handler}
      sendEmailHandler={sendEmailHandler}
      authCodeValueHandler={authCodeValueHandler}
      compareAuthCode={compareAuthCode}
      handleSubmit={handleSubmit}
    ></ForgotPasswordPresenter>
  );
};

export default withRouter(ForgotPasswordContainer);
