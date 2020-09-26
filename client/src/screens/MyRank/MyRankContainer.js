import React, { useState, useEffect } from "react";
import MyRankPresenter from "./MyRankPresenter";
import axios from "axios";
import { useSelector } from "react-redux";

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

const MyRankContainer = () => {
  const userData = useSelector((state) => state.user.userData);
  const { summoner, school } = userData;
  const [summonerLists, setSummonerLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [summonerListsPerPage] = useState(10);

  const [isOver30, setIsOver30] = useState(true);
  const [mySchool, setMySchool] = useState("");
  const [summonerTerm, setSummonerTerm] = useState("");
  useEffect(() => {
    if (userData.isLoggedIn) {
      if (summoner.tier && school) {
        const fetchSummonerLists = async () => {
          setIsLoading(true);
          const res = await axios.get(
            `/api/users/get/myRankInSchool/${school}`
          );

          let summonerHasScore = [];
          for (let user of res.data) {
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
          setSummonerLists(sortedSummonerLists);
          setMySchool(school);
          setIsLoading(false);
        };
        fetchSummonerLists();
      } else if (!summoner.tier) {
        setIsOver30(false);
        setMySchool(school);
      }
    }
  }, [school, summoner.tier]);

  const summonerTermHandler = (e) => {
    const { value } = e.target;
    setSummonerTerm(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await axios.get(`/api/users/get/myrank/${summonerTerm}`);
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
      setSummonerLists(sortedSummonerLists);
      setMySchool(res.data.user.school);
      setIsLoading(false);
    } else {
      setSummonerTerm("");
      setIsLoading(false);
      alert(res.data.msg);
    }
  };
  // Get current posts
  const indexOfLastPost = currentPage * summonerListsPerPage;
  const indexOfFirstPost = indexOfLastPost - summonerListsPerPage;
  const currentSummonerLists = summonerLists.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <MyRankPresenter
      summonerLists={summonerLists}
      currentSummonerLists={currentSummonerLists}
      isLoading={isLoading}
      summonerListsPerPage={summonerListsPerPage}
      paginate={paginate}
      currentPage={currentPage}
      summonerTerm={summonerTerm}
      summonerTermHandler={summonerTermHandler}
      handleSubmit={handleSubmit}
      mySchool={mySchool}
      isLoggedIn={userData.isLoggedIn}
      isOver30={isOver30}
    />
  );
};

export default MyRankContainer;
