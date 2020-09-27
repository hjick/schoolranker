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
  grid-template-columns: [Rank] 1fr [School] 3fr [Score] 1fr;
  grid-auto-rows: 50px;
  border-bottom: 2px solid #9e9e9e;
  border-left: 2px solid #9e9e9e;
  border-top: 2px solid #9e9e9e;
  border-radius: 12px;
  & > div {
    border-top: 1px dotted #9e9e9e;
    border-right: 2px solid #9e9e9e;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > div:nth-child(1),
  div:nth-child(2),
  div:nth-child(3) {
    border-top: none;
    border-bottom: 2px solid #9e9e9e;
  }
  & > div:nth-child(4),
  div:nth-child(5),
  div:nth-child(6) {
    border-top: none;
  }
  & div:nth-child(3) {
    border-radius: 0 12px 0 0;
  }
  & div:last-child {
    border-radius: 0 0 12px 0;
  }
`;

const RankItem = styled.div``;
const SchoolItem = styled.div`
  span:hover {
    cursor: pointer;
  }
`;
const ScoreItem = styled.div``;

const Medal = styled(FontAwesomeIcon)`
  margin-left: -2.5rem;
  margin-right: 1.2rem;
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
const SchoolLists = ({
  schoolListsPerPage,
  currentSchoolLists,
  isLoading,
  currentPage,
  searchSchoolLists,
}) => {
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <Grid>
      <RankItem>랭킹</RankItem>
      <SchoolItem>학교</SchoolItem>
      <ScoreItem>점수</ScoreItem>
      {!searchSchoolLists.length > 0 &&
        currentSchoolLists &&
        currentSchoolLists.length > 0 && (
          <>
            {currentSchoolLists.map((schoolList, index) => (
              <React.Fragment key={schoolList.school}>
                <RankItem>
                  {(currentPage - 1) * schoolListsPerPage + (index + 1) ===
                    1 && <GoldMedal icon="medal" />}
                  {(currentPage - 1) * schoolListsPerPage + (index + 1) ===
                    2 && <SilverMedal icon="medal" />}
                  {(currentPage - 1) * schoolListsPerPage + (index + 1) ===
                    3 && <BronzeMedal icon="medal" />}

                  {` ${(currentPage - 1) * schoolListsPerPage + (index + 1)}`}
                </RankItem>
                <SchoolItem>
                  <span>{schoolList.school}</span>
                </SchoolItem>
                <ScoreItem>{schoolList.totalScore}</ScoreItem>
              </React.Fragment>
            ))}
          </>
        )}
      {searchSchoolLists.length > 0 && (
        <>
          {searchSchoolLists.map((schoolList, index) => (
            <React.Fragment key={schoolList.school}>
              <RankItem>
                {schoolList.rank === 1 && <GoldMedal icon="medal" />}
                {schoolList.rank === 2 && <SilverMedal icon="medal" />}
                {schoolList.rank === 3 && <BronzeMedal icon="medal" />}

                {schoolList.rank}
              </RankItem>
              <SchoolItem>
                <span>{schoolList.school}</span>
              </SchoolItem>
              <ScoreItem>{schoolList.totalScore}</ScoreItem>
            </React.Fragment>
          ))}
        </>
      )}
    </Grid>
  );
};

export default SchoolLists;
