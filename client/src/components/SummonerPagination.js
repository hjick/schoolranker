import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  margin-bottom: 2rem;
`;

const Item = styled.li`
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  /* border: 1px #9e9e9e solid; */
  background-color: ${({ currentPage }) => (currentPage ? "#2fbaa5" : "#fff")};
  font-weight: 500;
  color: ${({ currentPage }) => (currentPage ? "#fff" : "#616161")};
  border-radius: 5px;
  text-align: center;
  margin: 0.2rem;
  &:hover {
    cursor: ${({ currentPage }) => (currentPage ? "default" : "pointer")};
  }
`;

const SummonerPagination = ({
  summonerListsPerPage,
  totalSummonerLists,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(totalSummonerLists / summonerListsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }
  return (
    <Nav>
      <ul>
        {pageNumbers.map((number) => (
          <Item
            currentPage={currentPage === number}
            onClick={() => paginate(number)}
            key={number}
          >
            {number}
          </Item>
        ))}
      </ul>
    </Nav>
  );
};

export default SummonerPagination;
