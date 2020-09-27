import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import PacmanLoader from "react-spinners/PacmanLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyHelmet from "components/MyHelmet";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 400;
  justify-content: start;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-bottom: 2rem;
  /* Sidebar */
  transition: margin-left 0.3s ease;
  margin-left: ${({ showSidebar }) => showSidebar && "50px"};
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem;
`;
// const SmallContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 350px;
//   margin: 1rem;
// `;

const Label = styled.label`
  display: inline-block;
  font-family: "Do Hyeon", sans-serif;
  color: #616161;
  font-size: 1.5rem;
  width: 100%;
  text-align: center;
  margin-top: 5rem;
`;

// const Text = styled.div`
//   font-size: 1.2rem;
//   margin-bottom: 3rem;
// `;

const SummonerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: ${(props) =>
    props.modifyModeSummoner ? "flex-start" : "center"};
  border: 2px solid #9e9e9e;
  width: 380px;
  height: 500px;
  padding: 1.7rem;
  margin: 0 2rem;
  border-radius: 12px;
`;

const SchoolContainer = styled(SummonerContainer)`
  align-items: ${(props) => (props.modifyModeSchool ? "flex-start" : "center")};
`;

const MySchool = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;
const ListSchool = styled.ul`
  margin-right: 3rem;
  li:first-child {
    margin-bottom: 0.7rem;
  }
`;
const SchoolRank = styled.li`
  margin-bottom: 0.3rem;
  color: #616161;
`;

const Name = styled.div`
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
`;
const Emblem = styled.img`
  display: inline-block;
  margin-right: 1.3rem;
  width: 156px;
  height: 156px;
`;
const Icon = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
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
  font-size: 1.1rem;
`;
const LP = styled.li`
  font-size: 0.8rem;
  color: #616161;
  margin-top: 0.5rem;
`;

const ModifyBtn = styled.button`
  display: block;
  margin-top: 5rem;
  width: 148px;
  height: 48px;
  border: none;
  background-color: #febf63;
  border-radius: 5px;
  font-size: 1.3rem;
  color: #fff;
  font-family: "Do Hyeon", sans-serif;
  text-align: center;
  &:hover {
    background-color: #f2b65e;
    cursor: pointer;
  }
`;

const Update = styled.button`
  border: none;
  background-color: ${({ isUpdatingSummoner }) =>
    isUpdatingSummoner ? "#f2b65e" : "#35d0ba"};
  color: #fff;
  font-size: 0.8rem;
  font-weight: 400;
  width: 72px;
  height: 24px;
  border-radius: 5px;
  margin-top: 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;

const SpinnerBox = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
`;
const SummonerInput = styled.input`
  width: 75%;
  height: 40px;
  font-size: 1rem;
  font-weight: 400;
  border: none;
  color: #424242;
  border-bottom: 1.2px solid #bdbdbd;
  padding-left: 0.2rem;
  &:focus,
  &:valid {
    border-bottom: 1.2px solid #35d0ba;
  }
  &::placeholder {
    font-weight: 300;
    color: #757575;
  }
  &[readOnly] {
    border-bottom: 1.2px solid #35d0ba;
    color: #616161;
    background-color: #c7f0eb;
    border-radius: 5px 5px 0 0;
  }
`;

const SchoolInput = styled(SummonerInput)``;

const ModifySummonerBtn = styled.button`
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

const LoaderBoxSearch = styled.div`
  display: inline-block;
  margin-left: 1.1rem;
  margin-bottom: 0.5rem;
`;
const LoaderBoxModify = styled.div`
  position: relative;
  top: 0;
  left: 40%;
  margin: 8.5rem auto 1rem;
`;

const FontAwesome = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  margin-bottom: 8rem;
  color: #9e9e9e;
  &:hover {
    cursor: pointer;
  }
`;

const ListContainer = styled.div`
  margin-bottom: 1rem;
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

const UserProfile = ({
  showSidebar,
  modifyModeSummoner,
  newSummonerInput,
  newSummonerHandler,
  searchSummoner,
  modifySummonerHandler,
  summonerName,
  summonerIcon,
  tier,
  rank,
  summonerLevel,
  leaguePoints,
  school,
  user,
  _id,
  setModifyModeSummoner,
  isSearchingSummoner,
  isModifyingSummoner,
  isUpdatingSummoner,
  updateHandler,
  modifyModeSchool,
  isSearchingSchool,
  newSchoolInput,
  newSchoolHandler,
  isModifyingSchool,
  isUpdatingSchool,
  authSchool,
  authSummoner,
  searchSchool,
  modifySchoolHandler,
  schoolLists,
  regionHandler,
  mySchoolRanking,
  myRankingInSchool,
  toModifyModeSchool,
}) => {
  if (user.userData?._id) {
    return (
      <>
        <MyHelmet title="내 정보 | School Ranker" />

        <Wrapper showSidebar={showSidebar}>
          <Label>내 정보</Label>
          <Container>
            <SummonerContainer modifyModeSummoner={modifyModeSummoner}>
              {modifyModeSummoner ? (
                /////// 수정 모드
                <>
                  <FontAwesome
                    icon="arrow-left"
                    onClick={() => setModifyModeSummoner(false)}
                  />
                  <label>롤 소환사 명</label>
                  <form
                    onSubmit={modifySummonerHandler}
                    style={{ width: "100%", marginTop: "1rem" }}
                  >
                    <SummonerInput
                      type="text"
                      value={newSummonerInput}
                      onChange={newSummonerHandler}
                      required
                      readOnly={authSummoner}
                      placeholder="ex) 지기노무상"
                    ></SummonerInput>
                    {isSearchingSummoner ? (
                      <LoaderBoxSearch>
                        <PacmanLoader
                          size={17}
                          color={"#F7F700"}
                          loading={isSearchingSummoner}
                        />
                      </LoaderBoxSearch>
                    ) : (
                      <>
                        <ModifySummonerBtn
                          onClick={searchSummoner}
                          type="button"
                          disabled={authSummoner}
                        >
                          검색
                        </ModifySummonerBtn>
                      </>
                    )}
                    {isModifyingSummoner ? (
                      <LoaderBoxModify>
                        <PacmanLoader
                          size={30}
                          color={"#F7F700"}
                          loading={isModifyingSummoner}
                        />
                      </LoaderBoxModify>
                    ) : (
                      <ModifyBtn
                        type="submit"
                        // onClick={modifySummonerHandler}
                        style={{ margin: "8.5rem auto 1rem" }}
                      >
                        {summonerName ? "수정완료" : "등록완료"}
                      </ModifyBtn>
                    )}
                  </form>
                </>
              ) : (
                ///// 수정 모드 끝

                //// 일반모드

                <>
                  {summonerName && summonerIcon ? (
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "2rem",
                          marginTop: "2.5rem",
                        }}
                      >
                        <Icon src={summonerIcon}></Icon>

                        <Name>{summonerName}</Name>
                      </div>
                      {tier ? ( ///////// 렙 30 이상
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
                            <div>
                              <Update
                                onClick={updateHandler}
                                isUpdatingSummoner={isUpdatingSummoner}
                              >
                                Update
                              </Update>
                            </div>
                          </List>
                        </div>
                      ) : (
                        //////////// 언랭
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            margin: "4.3rem 0",
                          }}
                        >
                          언랭이에요 ...
                        </div>
                      )}

                      <ModifyBtn
                        type="button"
                        onClick={() => setModifyModeSummoner(true)}
                      >
                        소환사 수정하기
                      </ModifyBtn>
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Icon src={summonerIcon}></Icon>
                        <div style={{ margin: "2rem auto 5rem" }}>
                          소환사를 등록해주세요 !
                        </div>
                        <ModifyBtn
                          onClick={() => setModifyModeSummoner(true)}
                          type="button"
                          style={{ marginBottom: "2rem" }}
                        >
                          소환사 등록하기
                        </ModifyBtn>
                      </div>
                    </>
                  )}
                </>
              )}
            </SummonerContainer>

            <SchoolContainer modifyModeSchool={modifyModeSchool}>
              {modifyModeSchool ? ( /// 학교 수정 모드
                <>
                  <FontAwesome
                    style={{ marginBottom: "2rem" }}
                    icon="arrow-left"
                    onClick={toModifyModeSchool}
                  />
                  <label>우리 학교</label>

                  <div style={{ width: "100%", marginTop: "1rem" }}>
                    <SchoolInput
                      type="text"
                      value={newSchoolInput}
                      onChange={newSchoolHandler}
                      required
                      placeholder="ex) 동작고등학교"
                      readOnly={authSchool}
                    ></SchoolInput>
                    {isSearchingSchool ? (
                      <LoaderBoxSearch>
                        <PacmanLoader
                          size={17}
                          color={"#F7F700"}
                          loading={isSearchingSchool}
                        />
                      </LoaderBoxSearch>
                    ) : (
                      <>
                        <ModifySummonerBtn
                          onClick={searchSchool}
                          type="button"
                          disabled={authSchool}
                        >
                          검색
                        </ModifySummonerBtn>
                      </>
                    )}
                    {schoolLists &&
                      schoolLists.length > 0 && ( // 학교 검색 완료 했을 때
                        <ListContainer>
                          <ul style={{ marginTop: "1rem" }}>
                            {schoolLists.map((schoolList) => (
                              <Item
                                key={schoolList.id}
                                onClick={regionHandler}
                                name={schoolList.region}
                              >
                                {schoolList.schoolName}, {schoolList.address}
                              </Item>
                            ))}
                          </ul>
                        </ListContainer>
                      )}
                    {isModifyingSchool ? (
                      <LoaderBoxModify>
                        <PacmanLoader
                          size={30}
                          color={"#F7F700"}
                          loading={isModifyingSchool}
                        />
                      </LoaderBoxModify>
                    ) : (
                      <ModifyBtn
                        type="button"
                        onClick={modifySchoolHandler}
                        style={{ margin: "4rem auto 1rem" }}
                      >
                        {school ? "수정완료" : "등록완료"}
                      </ModifyBtn>
                    )}
                  </div>
                </>
              ) : (
                /// 학교 일반 모드
                <>
                  {school ? (
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "2rem",
                          marginTop: "2.5rem",
                        }}
                      >
                        <MySchool>{school}</MySchool>
                      </div>

                      <FontAwesomeIcon
                        icon="school"
                        size="7x"
                        style={{ color: "#fbd46d", marginBottom: "1.5rem" }}
                      />
                      <ListSchool>
                        <SchoolRank>
                          <span>우리학교 랭킹 : </span>
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
                              <span style={{ fontSize: "1.2rem" }}>
                                {mySchoolRanking.rank}
                              </span>
                              &nbsp;등
                            </>
                          )}
                        </SchoolRank>
                        <SchoolRank>
                          <span>학교에서 내 랭킹 : </span>

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
                              <span style={{ fontSize: "1.2rem" }}>
                                {myRankingInSchool}
                              </span>
                              &nbsp;등
                            </>
                          )}
                        </SchoolRank>
                      </ListSchool>
                      <ModifyBtn onClick={toModifyModeSchool} type="button">
                        학교 수정하기
                      </ModifyBtn>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon="school"
                        style={{
                          fontSize: "48px",
                          color: "#bdbdbd",
                          marginTop: "6.5rem",
                        }}
                      />
                      <div style={{ margin: "2rem auto 5rem" }}>
                        학교를 등록해주세요 !
                      </div>
                      <ModifyBtn onClick={toModifyModeSchool} type="button">
                        학교 등록하기
                      </ModifyBtn>
                    </>
                  )}
                </>
              )}
            </SchoolContainer>
          </Container>
        </Wrapper>
      </>
    );
  } else {
    return (
      <>
        <MyHelmet title="내 정보 | School Ranker" />

        <SpinnerBox>
          <PacmanLoader size={45} color={"#F7F700"} />
        </SpinnerBox>
      </>
    );
  }
};

export default withRouter(UserProfile);
