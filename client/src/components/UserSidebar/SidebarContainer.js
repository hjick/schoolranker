import React, { useState, useEffect } from "react";
import SidebarPresenter from "./SidebarPresenter";
import { useDispatch, useSelector } from "react-redux";
import { showSIDEBAR } from "../../_actions/view_action";
import axios from "axios";
import { modifySummoner } from "../../_actions/user_action";
import { withRouter } from "react-router-dom";

const UserSidebarContainer = ({ location: { pathname } }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const {
    userData: {
      // _id,
      // name,
      school,
      summoner,
      summoner: {
        summonerName,
        summonerId,
        profileIconId,
        summonerLevel,
        tier,
        rank,
        leaguePoints,
      },
      // school,
      isLoggedIn,
    },
  } = user;
  // 사이드메뉴 토글
  const [showSidebar, setShowSidebar] = useState(false);
  const [summonerIcon, setSummonerIcon] = useState("");
  const [newSummoner, setNewSummoner] = useState({});

  const [isUpdatingSummoner, setIsUpdatingSummoner] = useState(false);

  const [mySchoolRanking, setMySchoolRanking] = useState({});
  const [myRankingInSchool, setMyRankingInSchool] = useState("");

  const toggleHandler = () => {
    setShowSidebar((current) =>
      pathname === "/userprofile" ? false : !current
    );
  };
  useEffect(() => {
    if (isLoggedIn) {
      if (pathname === "/userprofile") {
        setShowSidebar(false);
        dispatch(showSIDEBAR(showSidebar));
      } else {
        dispatch(showSIDEBAR(showSidebar));
      }
    } else {
    }
  }, [showSidebar, dispatch, isLoggedIn, pathname]);

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
        const res = await axios.get(`api/users/get/schoolList`);
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
        if (res.data?.user && res.data?.users.length > 0) {
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

  return (
    <SidebarPresenter
      user={user}
      summoner={summoner}
      showSidebar={showSidebar}
      toggleHandler={toggleHandler}
      summonerIcon={summonerIcon}
      summonerName={summonerName}
      tier={tier}
      summonerLevel={summonerLevel}
      rank={rank}
      leaguePoints={leaguePoints}
      updateHandler={updateHandler}
      isUpdatingSummoner={isUpdatingSummoner}
      mySchoolRanking={mySchoolRanking}
      myRankingInSchool={myRankingInSchool}
      school={school}
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

export default withRouter(UserSidebarContainer);
