import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Grid = styled.div`
  margin: 2rem auto 1rem;
  display: grid;
  justify-content: center;
  width: 65%;
  height: 100%;
  margin: 2rem;
  grid-template-columns: [Rank] 1fr [Summoner] 4fr [Tier] 2fr [LP] 0.8fr;
  grid-auto-rows: 50px;
  border: 2px solid #bdbdbd;
  border-radius: 12px;
  & > div {
    border-top: 1px solid #bdbdbd;
    display: flex;
    justify-content: center;
    align-items: center;
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      border-top: none;
    }
  }
`;
const Item = styled.div``;
const RankItem = styled.div``;
const SummonerItem = styled.div``;
const TierItem = styled.div``;
const LPItem = styled.div``;

const Medal = styled(FontAwesomeIcon)`
  margin-left: -1.5rem;
  margin-right: 0.5rem;
  font-size: 1.3rem;
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

const Emblem = styled.img`
  width: 32px;
  margin-right: 1rem;
`;
const SummonerLists = ({
  currentSummonerLists,
  isLoading,
  currentPage,
  summonerListsPerPage,
  mySchool,
}) => {
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      {" "}
      <Grid>
        <Item>랭킹</Item>
        <Item>소환사</Item>
        <Item>티어</Item>
        <Item>LP</Item>
        {currentSummonerLists?.length > 0 && (
          <>
            {currentSummonerLists.map((summonerList, index) => (
              <React.Fragment key={summonerList.summonerName}>
                <RankItem>
                  {(currentPage - 1) * summonerListsPerPage + (index + 1) ===
                    1 &&
                    mySchool && <GoldMedal icon="medal" />}
                  {(currentPage - 1) * summonerListsPerPage + (index + 1) ===
                    2 &&
                    mySchool && <SilverMedal icon="medal" />}
                  {(currentPage - 1) * summonerListsPerPage + (index + 1) ===
                    3 &&
                    mySchool && <BronzeMedal icon="medal" />}

                  {` ${(currentPage - 1) * summonerListsPerPage + (index + 1)}`}
                </RankItem>
                <SummonerItem>
                  <span>{summonerList.summonerName}</span>
                </SummonerItem>
                <TierItem>
                  <Emblem
                    src={`${process.env.PUBLIC_URL}/img/ranked-emblems/${summonerList.tier}.png`}
                  />
                  {summonerList.tier} {summonerList.rank}
                </TierItem>
                <LPItem>{summonerList.leaguePoints}</LPItem>
              </React.Fragment>
            ))}
          </>
        )}
      </Grid>
    </>
  );
};

export default SummonerLists;
