import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = styled.div`
  position: absolute;
  top: 96px;
  left: 0;
  width: 200px;
  height: 100%;
  z-index: 100;
  transition: transform 0.3s ease;
  transform: ${({ show }) => !show && "translateX(-100%);"};
  border-right: 2px solid #fff;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Toggle = styled(FontAwesomeIcon)`
  position: absolute;
  top: 112px;
  z-index: 100;
  transition: left 0.3s ease;
  left: ${({ show }) => (show ? "216px" : "16px")};
  color: ${({ show }) => (show ? "#ffe18c" : "#E0E0E0")};
  transform: ${({ show }) => !show && "rotate(180deg)"};
  &:hover {
    cursor: pointer;
  }
`;
const Icon = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
`;

const SummonerName = styled.div`
  padding: 1rem;
  font-size: ${({ longName }) => (longName ? "0.8rem" : "1.1rem")};
  font-weight: 500;
`;

const Emblem = styled.img`
  display: inline-block;
  margin-right: 1rem;
  width: 72px;
  height: 72px;
`;

const List = styled.ul`
  margin-top: 0.5rem;
  li {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
`;
const Solo = styled.li`
  font-weight: 400 !important;
  font-size: 0.8rem;
  color: #616161;
`;
const Tier = styled.li`
  color: #00b8a9;
  font-size: 0.9rem;
`;
const LP = styled.li`
  font-size: 0.8rem;
  color: #616161;
  margin-top: 0.5rem;
`;

const Update = styled.button`
  border: none;
  background-color: ${({ isUpdatingSummoner }) =>
    isUpdatingSummoner ? "#f2b65e" : "#35d0ba"};
  color: #fff;
  font-size: 0.8rem;
  font-weight: 400;
  width: 96px;
  height: 24px;
  margin-top: 1rem;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const RegisterLink = styled(Link)`
  display: block;
  background-color: #febf63;
  color: #fff;
  font-weight: 400;
  height: 36px;
  width: 80%;
  text-align: center;
  border-radius: 5px;
  line-height: 36px;
  &:hover {
    background-color: #f2b65e;
  }
`;
const School = styled.div`
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
  font-weight: 400;
  color: #616161;
`;

const Medal = styled(FontAwesomeIcon)`
  margin-right: 0.6rem;
  margin-left: 0.2rem;
`;
const GoldMedal = styled(Medal)`
  color: #e6c200;
`;
const SilverMedal = styled(Medal)`
  color: #c0c0c0;
`;
const BronzeMedal = styled(Medal)`
  color: #cd7f32;
`;

const UserSidebar = ({
  user,
  summoner,
  showSidebar,
  toggleHandler,
  summonerIcon,
  summonerName,
  tier,
  summonerLevel,
  rank,
  leaguePoints,
  updateHandler,
  isUpdatingSummoner,
  mySchoolRanking,
  myRankingInSchool,
  school,
}) => {
  if (user.userData?.isLoggedIn) {
    return (
      <>
        <div>
          <Toggle
            show={showSidebar ? 1 : 0}
            type="button"
            onClick={toggleHandler}
            icon="toggle-on"
            size="2x"
          />
        </div>

        <Sidebar show={showSidebar}>
          <Container>
            {Object.keys(summoner).length > 0 ? (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "2rem",
                  }}
                >
                  <Icon src={summonerIcon} />
                  <SummonerName longName={summonerName.length > 5}>
                    {summonerName}
                  </SummonerName>
                </div>
                {Object.keys(summoner).length > 0 && tier ? ( ////// 롤 렙 30이상
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Emblem
                      src={`${process.env.PUBLIC_URL}/img/ranked-emblems/${tier}.png`}
                    />
                    <List>
                      <Solo>솔로랭크</Solo>
                      <li>{`Lv. ${summonerLevel}`}</li>

                      <Tier>
                        {tier} {rank === "I" && "1"}
                        {rank === "II" && "2"}
                        {rank === "III" && "3"}
                        {rank === "IV" && "4"}
                        {rank === "V" && "5"}
                      </Tier>
                      <LP>{leaguePoints} LP</LP>
                    </List>
                  </div>
                ) : (
                  //////// 언랭
                  <div style={{ margin: "3rem 0", fontWeight: "400" }}>
                    언랭이에요 ...
                  </div>
                  // --------summoner.length > 0 && tier ------------ //
                )}

                <div>
                  <Update
                    onClick={updateHandler}
                    isUpdatingSummoner={isUpdatingSummoner}
                  >
                    Update
                  </Update>
                </div>

                {school ? (
                  <>
                    <School>{school.split("(")[0]}</School>
                    <span style={{ marginBottom: "1rem" }}>
                      {school.split(" ")[1]}
                    </span>
                    <>
                      <FontAwesomeIcon
                        icon="school"
                        size="2x"
                        style={{ color: "#fbd46d", marginBottom: "1.5rem" }}
                      />
                      <span style={{ marginBottom: "1rem" }}>
                        우리학교 랭킹 :
                      </span>
                      <div style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
                        {Object.keys(mySchoolRanking).length > 0 && (
                          <>
                            {mySchoolRanking.rank === 1 && (
                              <>
                                <GoldMedal icon="medal" />
                              </>
                            )}
                            {mySchoolRanking.rank === 2 && (
                              <>
                                <SilverMedal icon="medal" />
                              </>
                            )}
                            {mySchoolRanking.rank === 3 && (
                              <>
                                <BronzeMedal icon="medal" />
                              </>
                            )}
                            <span style={{ fontSize: "1.5rem" }}>
                              {mySchoolRanking.rank}
                            </span>
                            &nbsp;등
                          </>
                        )}
                      </div>

                      <span style={{ marginBottom: "1rem" }}>
                        학교에서 내 랭킹 :
                      </span>
                      <div style={{ fontSize: "1.2rem" }}>
                        {myRankingInSchool && (
                          <>
                            {myRankingInSchool === 1 && (
                              <>
                                <GoldMedal icon="medal" />
                              </>
                            )}
                            {myRankingInSchool === 2 && (
                              <>
                                <SilverMedal icon="medal" />
                              </>
                            )}
                            {myRankingInSchool === 3 && (
                              <>
                                <BronzeMedal icon="medal" />
                              </>
                            )}
                            <span style={{ fontSize: "1.5rem" }}>
                              {myRankingInSchool}
                            </span>
                            &nbsp;등
                          </>
                        )}
                      </div>
                    </>
                  </>
                ) : (
                  <School>학교를 등록해주세요 ..</School>
                )}
              </>
            ) : (
              //// 소환사 등록 안돼있을때
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "2rem",
                  }}
                >
                  <Icon src={summonerIcon} />
                </div>
                <div style={{ margin: "3rem 0", fontWeight: "400" }}>
                  소환사를 등록해주세요 !
                </div>
                <RegisterLink to="/userprofile">등록하러 가기</RegisterLink>
              </>
            )}
          </Container>
        </Sidebar>
      </>
    );
  } else {
    return null;
  }
};

export default UserSidebar;
