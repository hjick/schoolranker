import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import RegisterPresenter from "./RegisterPresenter";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_actions/user_action";
import axios from "axios";

const RegisterContainer = ({ history }) => {
  const dispatch = useDispatch();
  // console.log(sendEmail);

  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [summoner, setSummoner] = useState("");
  const [summonerInput, setSummonerInput] = useState("");
  const [school, setSchool] = useState("");

  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSearchingSummoner, setIsSearchingSummoner] = useState(false);
  const [isSearchingSchool, setIsSearchingSchool] = useState(false);
  const [authCodeValue, setAuthCodeValue] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isAuthing, setIsAuthing] = useState(false);
  const [isCodeMatch, setIsCodeMatch] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidSummoner, setIsValidSummoner] = useState(false);
  const [isValidSchool, setIsValidSchool] = useState(false);
  const [schoolLists, setSchoolLists] = useState([]);

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
  const summonerHandler = (e) => {
    const { value } = e.target;
    setSummonerInput(value);
  };
  const schoolHandler = (e) => {
    const { value } = e.target;
    setSchool(value);
  };

  const regionHandler = (e) => {
    const region = e.target.getAttribute("name");
    setSchool((current) => `${current} (${region})`);
    setSchoolLists([]);
  };

  // 이메일 인증
  const sendEmailHandler = () => {
    setIsSending(true);
    let body = {
      email,
    };

    axios.post("/api/users/sendEmail", body).then((response) => {
      setIsSending(false);
      const {
        data: { success, authCode },
      } = response;

      if (success) {
        alert("인증메일을 보냈어요 !");
        setIsSendEmail(true);
        setAuthCode(authCode);
      } else {
        alert("이미 가입한 이메일이에요 !");
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

  // 소환사 등록
  const searchSummoner = (e) => {
    e.preventDefault();
    setIsSearchingSummoner(true);

    let summonerBody = {
      summonerInput,
    };

    axios.post("/api/users/search/summoner", summonerBody).then((response) => {
      setIsSearchingSummoner(false);
      const {
        data: { id, name, profileIconId, summonerLevel },
      } = response;

      if (summonerInput === name) {
        setIsSearchingSummoner(false);
        setIsValidSummoner(true);
        if (response.data[0]?.queueType === "RANKED_SOLO_5x5") {
          const { tier = "", rank = "", leaguePoints = "" } = response.data[0];
          setSummoner({
            summonerName: name,
            summonerId: id,
            profileIconId,
            summonerLevel,
            tier,
            rank,
            leaguePoints,
          });
        } else if (response.data[1]?.queueType === "RANKED_SOLO_5x5") {
          const { tier = "", rank = "", leaguePoints = "" } = response.data[1];
          setSummoner({
            summonerName: name,
            summonerId: id,
            profileIconId,
            summonerLevel,
            tier,
            rank,
            leaguePoints,
          });
        } else {
          setSummoner({
            summonerName: name,
            summonerId: id,
            profileIconId,
            summonerLevel,
          });
        }
        alert("인증되었어요 !");
      } else {
        setIsSearchingSummoner(false);
        setSummonerInput("");
        alert("그런 소환사는 없어요 !");
      }
    });
  };

  // 학교 등록
  const searchSchool = (e) => {
    e.preventDefault();
    setIsSearchingSchool(true);

    let schoolValue = {
      school,
    };
    if (
      school.includes("중학교") ||
      school.includes("고등학교") ||
      school.includes("대학교")
    ) {
      if (school === "중학교" || school === "고등학교" || school === "대학교") {
        setIsSearchingSchool(false);
        alert("학교이름을 정확하게 입력해주세요 !");
      } else {
        axios.post("/api/users/search/school", schoolValue).then((response) => {
          const {
            data: {
              dataSearch: { content },
            },
          } = response;
          let _schoolList = [];
          if (content.length > 0) {
            for (let school of content) {
              _schoolList.push({
                id: school.seq,
                schoolName: school.schoolName,
                address: school.adres,
                region: school.region,
              });
            }
            setIsSearchingSchool(false);
            setIsValidSchool(true);
          } else {
            setIsSearchingSchool(false);
            alert("학교이름을 정확하게 입력해주세요 !");
          }

          setSchoolLists(_schoolList);
        });
      }
    } else {
      setIsSearchingSchool(false);
      alert("학교이름을 정확하게 입력해주세요 !");
    }
  };

  // 회원가입 Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (
      password === password2 &&
      isCodeMatch &&
      isValidSummoner &&
      isValidSchool &&
      !schoolLists.length > 0
    ) {
      let body = {
        email,
        password,
        name,
        summoner,
        school,
      };

      dispatch(registerUser(body)).then((response) => {
        setIsSubmitting(false);
        if (response.payload.success) {
          history.push("/registersuccess");
        } else {
          alert("다시 한번 확인해보세요 !");
        }
      });
    } else if (!isCodeMatch) {
      setIsSubmitting(false);
      alert("이메일 인증을 완료해주세요 !");
    } else if (!(password === password2)) {
      setIsSubmitting(false);
      alert("다시 한번 확인해보세요 !");
    } else if (!isValidSummoner) {
      setIsSubmitting(false);
      alert("소환사 인증을 해주세요 !");
    } else if (!isValidSchool) {
      setIsSubmitting(false);
      alert("학교를 입력해주세요 !");
    } else if (schoolLists.length > 0) {
      setIsSubmitting(false);
      alert("학교 지역을 선택해주세요 !");
    }
  };

  return (
    <RegisterPresenter
      handleSubmit={handleSubmit}
      name={name}
      nameHandler={nameHandler}
      email={email}
      emailHandler={emailHandler}
      isSendEmail={isSendEmail}
      isSending={isSending}
      sendEmailHandler={sendEmailHandler}
      authCodeValue={authCodeValue}
      authCodeValueHandler={authCodeValueHandler}
      isCodeMatch={isCodeMatch}
      isAuthing={isAuthing}
      compareAuthCode={compareAuthCode}
      password={password}
      passwordHandler={passwordHandler}
      password2={password2}
      password2Handler={password2Handler}
      summoner={summoner}
      summonerInput={summonerInput}
      summonerHandler={summonerHandler}
      isValidSummoner={isValidSummoner}
      isSearchingSummoner={isSearchingSummoner}
      searchSummoner={searchSummoner}
      school={school}
      schoolHandler={schoolHandler}
      isSearchingSchool={isSearchingSchool}
      searchSchool={searchSchool}
      schoolLists={schoolLists}
      regionHandler={regionHandler}
      isSubmitting={isSubmitting}
      isValidSchool={isValidSchool}
    />
  );
};

export default withRouter(RegisterContainer);
