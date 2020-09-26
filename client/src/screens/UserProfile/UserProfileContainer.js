import React, { useState, useEffect } from "react";
import UserProfilePresenter from "./UserProfilePresenter";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { modifySummoner, modifySchool } from "../../_actions/user_action";

const UserProfileContainer = () => {
  // State
  const [summonerIcon, setSummonerIcon] = useState("");
  const [newSummoner, setNewSummoner] = useState({});
  const [newSchool, setNewSchool] = useState("");

  const [modifyModeSummoner, setModifyModeSummoner] = useState(false);
  const [modifyModeSchool, setModifyModeSchool] = useState(false);
  const [isSearchingSummoner, setIsSearchingSummoner] = useState(false);
  const [isSearchingSchool, setIsSearchingSchool] = useState(false);

  const [isModifyingSummoner, setIsModifyingSummoner] = useState(false);
  const [isModifyingSchool, setIsModifyingSchool] = useState(false);
  const [isUpdatingSummoner, setIsUpdatingSummoner] = useState(false);
  const [isUpdatingSchool] = useState(false);
  const [authSummoner, setAuthSummoner] = useState(false);
  const [authSchool, setAuthSchool] = useState(false);
  const [schoolLists, setSchoolLists] = useState([]);
  const [mySchoolRanking, setMySchoolRanking] = useState({});
  const [myRankingInSchool, setMyRankingInSchool] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const view = useSelector((state) => state.view);
  const { showSidebar } = view;
  const {
    userData: {
      _id,
      // name,
      school,
      summoner: {
        summonerName,
        summonerId,
        profileIconId,
        summonerLevel,
        tier,
        rank,
        leaguePoints,
      },
    },
  } = user;

  useEffect(() => {
    if (profileIconId) {
      axios(
        `https://ddragon.leagueoflegends.com/cdn/10.18.1/img/profileicon/${profileIconId}.png`
      ).then((response) => {
        setSummonerIcon(response.config.url);
      });
    } else {
      axios(
        `https://ddragon.leagueoflegends.com/cdn/10.18.1/img/profileicon/29.png`
      ).then((response) => {
        setSummonerIcon(response.config.url);
      });
    }
  }, [profileIconId]);

  useEffect(() => {
    if (tier && school) {
      const fetchSchoolRanking = async () => {
        const res = await axios.get("/api/users/get/schoolList");
        if (res.data?.length > 0) {
          const sortedSchoolLists = res.data.sort(
            (a, b) => b.totalScore - a.totalScore
          );
          const schoolRank = {};
          for (let [index, element] of sortedSchoolLists.entries()) {
            const theSchool = element.school === school;
            if (theSchool) {
              schoolRank.rank = index + 1;
              schoolRank.school = element.school;
              // schoolRank.push({ rank:index+1 , school });
              break;
            }
          }
          setMySchoolRanking(schoolRank);
        }
      };

      fetchSchoolRanking();
    }
  }, [tier, school]);

  // 학교에서 내 순위

  useEffect(() => {
    if (summonerName) {
      const getMyRanking = async () => {
        const res = await axios.get(`/api/users/get/myrank/${summonerName}`);
        if (res.data?.user && res.data?.users.length > 0 && tier) {
          let summonerHasScore = [];
          for (let user of res.data.users) {
            user.summoner.score = 0;
            const {
              summoner: { tier, rank, leaguePoints },
            } = user;
            switch (tier) {
              case "CHALLENGER":
                user.summoner.score = CHALLENGER;
                break;
              case "GRANDMASTER":
                user.summoner.score = GRANDMASTER;
                break;

              case "MASTER":
                user.summoner.score = MASTER;
                break;

              case "DIAMOND":
                user.summoner.score = DIAMOND;
                break;

              case "PLATINUM":
                user.summoner.score = PLATINUM;
                break;

              case "GOLD":
                user.summoner.score = GOLD;
                break;

              case "SILVER":
                user.summoner.score = SILVER;
                break;

              case "BRONZE":
                user.summoner.score = BRONZE;
                break;

              case "IRON":
                user.summoner.score = IRON;
                break;

              default:
                break;
            }
            switch (rank) {
              case "I":
                user.summoner.score = user.summoner.score + I;
                break;
              case "II":
                user.summoner.score = user.summoner.score + II;
                break;
              case "III":
                user.summoner.score = user.summoner.score + III;
                break;
              case "IV":
                user.summoner.score = user.summoner.score + IV;
                break;
              case "V":
                user.summoner.score = user.summoner.score + V;
                break;

              default:
                break;
            }

            user.summoner.score = user.summoner.score + leaguePoints;

            summonerHasScore.push(user.summoner);
          }
          const sortedSummonerLists = summonerHasScore.sort(
            (a, b) => b.score - a.score
          );

          const myRanking = sortedSummonerLists.findIndex(
            (element) => element.summonerName === summonerName
          );

          setMyRankingInSchool(myRanking + 1);
        }
      };
      getMyRanking();
    }
  }, [summonerName, myRankingInSchool]);

  const [newSummonerInput, setNewSummonerInput] = useState("");
  const newSummonerHandler = (e) => {
    const { value } = e.target;
    setNewSummonerInput(value);
  };

  const [newSchoolInput, setNewSchoolInput] = useState("");
  const newSchoolHandler = (e) => {
    const { value } = e.target;
    setNewSchoolInput(value);
  };

  const toModifyModeSchool = () => {
    if (summonerName && tier) {
      setModifyModeSchool((current) => !current);
    } else if (!summonerName) {
      alert("소환사 먼저 등록해주세요 !");
    } else if (!tier) {
      alert("언랭은 쫌 ...");
    }
  };

  const regionHandler = (e) => {
    const region = e.target.getAttribute("name");
    setNewSchoolInput((current) => `${current} (${region})`);
    setNewSchool(`${newSchoolInput} (${region})`);
    setSchoolLists([]);
  };

  // 소환사 수정

  const searchSummoner = (e) => {
    e.preventDefault();
    setIsSearchingSummoner(true);

    let newSummonerBody = {
      newSummonerInput,
    };

    axios
      .post("/api/users/search/summoner", newSummonerBody)
      .then((response) => {
        setIsSearchingSummoner(false);
        const {
          data: { id, name, profileIconId, summonerLevel },
        } = response;

        if (newSummonerInput === name) {
          setIsSearchingSummoner(false);
          if (response.data[0]?.queueType === "RANKED_SOLO_5x5") {
            const {
              tier = "",
              rank = "",
              leaguePoints = "",
            } = response.data[0];
            setNewSummoner({
              summonerName: name,
              summonerId: id,
              profileIconId,
              summonerLevel,
              tier,
              rank,
              leaguePoints,
            });
          } else if (response.data[1]?.queueType === "RANKED_SOLO_5x5") {
            const {
              tier = "",
              rank = "",
              leaguePoints = "",
            } = response.data[1];
            setNewSummoner({
              summonerName: name,
              summonerId: id,
              profileIconId,
              summonerLevel,
              tier,
              rank,
              leaguePoints,
            });
          } else {
            setNewSummoner({
              summonerName: name,
              summonerId: id,
              profileIconId,
              summonerLevel,
            });
          }
          setAuthSummoner(true);
          alert("소환사를 찾았어요 !");
        } else {
          setIsSearchingSummoner(false);
          setNewSummonerInput("");
          alert("그런 소환사는 없어요 !");
        }
      });
  };

  const searchSchool = (e) => {
    e.preventDefault();
    setIsSearchingSchool(true);

    let newSchoolBody = {
      newSchoolInput,
    };

    if (
      newSchoolInput.includes("중학교") ||
      newSchoolInput.includes("고등학교") ||
      newSchoolInput.includes("대학교")
    ) {
      if (
        newSchoolInput === "중학교" ||
        newSchoolInput === "고등학교" ||
        newSchoolInput === "대학교"
      ) {
        setIsSearchingSchool(false);
        alert("학교이름을 정확하게 입력해주세요 !");
      } else {
        axios
          .post("/api/users/search/school", newSchoolBody)
          .then((response) => {
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
              setAuthSchool(true);
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

  const updateHandler = () => {
    setIsUpdatingSummoner(true);

    let body = {
      summonerId,
    };

    axios.post("/api/users/update/summoner", body).then((response) => {
      const {
        data: { id, name, profileIconId, summonerLevel },
      } = response;

      if (summonerId === id) {
        if (response.data[0]?.queueType === "RANKED_SOLO_5x5") {
          const { tier = "", rank = "", leaguePoints = "" } = response.data[0];
          setNewSummoner({
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
          setNewSummoner({
            summonerName: name,
            summonerId: id,
            profileIconId,
            summonerLevel,
            tier,
            rank,
            leaguePoints,
          });
        } else {
          setNewSummoner({
            summonerName: name,
            summonerId: id,
            profileIconId,
            summonerLevel,
          });
        }
        let data = {
          id,
          newSummoner,
        };

        dispatch(modifySummoner(data)).then((response) => {
          setIsUpdatingSummoner(false);
          alert("업데이트 됐어요 !");
        });
      } else {
        alert("error");
        setIsUpdatingSummoner(false);
      }
    });
  };

  // 소환사 등록완료 ,수정완료 버튼
  const modifySummonerHandler = (e) => {
    e.preventDefault();
    if (authSummoner) {
      setIsModifyingSummoner(true);

      let data = {
        _id,
        tier,
        school,
        newSummoner,
      };

      dispatch(modifySummoner(data)).then((response) => {
        setIsModifyingSummoner(false);
        setModifyModeSummoner(false);
      });
    } else {
      alert("소환사를 검색해주세요 !");
    }
  };

  // 학교 수정완료 버튼

  const modifySchoolHandler = () => {
    if (authSchool) {
      setIsModifyingSchool(true);

      let data = {
        _id,
        tier,
        school,
        newSchool,
      };

      dispatch(modifySchool(data)).then((response) => {
        setIsModifyingSchool(false);
        setModifyModeSchool(false);
      });
    } else {
      alert("학교를 검색해주세요 !");
    }
  };

  return (
    <UserProfilePresenter
      showSidebar={showSidebar}
      modifyModeSummoner={modifyModeSummoner}
      newSummonerInput={newSummonerInput}
      summonerName={summonerName}
      summonerIcon={summonerIcon}
      tier={tier}
      rank={rank}
      summonerLevel={summonerLevel}
      leaguePoints={leaguePoints}
      school={school}
      user={user}
      _id={_id}
      newSummonerHandler={newSummonerHandler}
      searchSummoner={searchSummoner}
      isSearchingSummoner={isSearchingSummoner}
      isModifyingSummoner={isModifyingSummoner}
      isUpdatingSummoner={isUpdatingSummoner}
      modifySummonerHandler={modifySummonerHandler}
      setModifyModeSummoner={setModifyModeSummoner}
      updateHandler={updateHandler}
      modifyModeSchool={modifyModeSchool}
      setModifyModeSchool={setModifyModeSchool}
      isSearchingSchool={isSearchingSchool}
      newSchoolInput={newSchoolInput}
      newSchoolHandler={newSchoolHandler}
      searchSchool={searchSchool}
      isModifyingSchool={isModifyingSchool}
      isUpdatingSchool={isUpdatingSchool}
      authSchool={authSchool}
      modifySchoolHandler={modifySchoolHandler}
      schoolLists={schoolLists}
      regionHandler={regionHandler}
      authSummoner={authSummoner}
      mySchoolRanking={mySchoolRanking}
      myRankingInSchool={myRankingInSchool}
      toModifyModeSchool={toModifyModeSchool}
    />
  );
};

const CHALLENGER = 90000;
const GRANDMASTER = 80000;
const MASTER = 70000;
const DIAMOND = 60000;
const PLATINUM = 50000;
const GOLD = 40000;
const SILVER = 30000;
const BRONZE = 20000;
const IRON = 10000;

const I = 5000;
const II = 4000;
const III = 3000;
const IV = 2000;
const V = 1000;

export default UserProfileContainer;
