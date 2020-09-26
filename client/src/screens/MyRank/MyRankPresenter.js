import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SummonerLists from "components/SummonerLists";
import SummonerPagination from "components/SummonerPagination";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 80vh;
  padding: 3rem;
`;
const SearchInput = styled.input`
  color: #424242;
  font-family: inherit;
  padding: 0 1rem;
  width: 100%;
  height: 40px;
  border-radius: 12px;
  border: 2px solid #bdbdbd;
  outline: none;
  font-size: 1rem;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);

  &::placeholder {
    color: #9e9e9e;
  }
  &:focus {
    border: 2px solid #5c5c5e;
    box-shadow: 0 2px 2px 0 rgba(92, 92, 94, 0.5);
  }
  &:not([value=""]) {
    border: 2px solid #5c5c5e;
    box-shadow: 0 2px 2px 0 rgba(92, 92, 94, 0.5);
  }
`;
const SearchBtn = styled.button`
  position: absolute;
  top: 2px;
  right: 10px;
  color: #9e9e9e;
  background-color: #fff;
  font-size: 1.3rem;
  height: 36px;
  width: 56px;
  border: none;

  &:hover {
    cursor: pointer;
    color: #f39c00;
  }
`;

const School = styled.h2`
  text-align: center;
  margin-top: 2rem;
  font-size: 1.5rem;
  color: #616161;
  font-weight: 400;
`;

const NoSchool = styled(School)`
  font-size: 1rem;
  color: #757575;
`;
const MyRankPresenter = ({
  summonerLists,
  currentSummonerLists,
  isLoading,
  summonerListsPerPage,
  paginate,
  currentPage,
  summonerTerm,
  summonerTermHandler,
  handleSubmit,
  mySchool,
  isLoggedIn,
  isOver30,
}) => {
  return (
    <>
      <Container>
        <a href="/myrank">
          <img
            width="360px"
            src={`${process.env.PUBLIC_URL}/img/logo2.png`}
            style={{ marginBottom: "2rem" }}
            alt="logo2"
          />
        </a>
        <form
          onSubmit={handleSubmit}
          style={{ width: "50%", position: "relative" }}
        >
          <SearchInput
            placeholder="소환사명을 입력해보세요 !"
            value={summonerTerm}
            onChange={summonerTermHandler}
            type="text"
          />

          <SearchBtn type="submit">
            <FontAwesomeIcon icon="search" />
          </SearchBtn>
        </form>

        {mySchool && <School>{mySchool}</School>}
        {isLoggedIn && !mySchool && !isLoading && (
          <NoSchool>등록된 학교가 없어요 !</NoSchool>
        )}
        {isLoggedIn && !isLoading && !isOver30 && (
          <div style={{ marginTop: "1rem" }}>언랭이에요 ...</div>
        )}
        <SummonerLists
          currentSummonerLists={currentSummonerLists}
          isLoading={isLoading}
          currentPage={currentPage}
          summonerListsPerPage={summonerListsPerPage}
          mySchool={mySchool}
        />
        <SummonerPagination
          summonerListsPerPage={summonerListsPerPage}
          totalSummonerLists={summonerLists.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Container>
    </>
  );
};

export default MyRankPresenter;
