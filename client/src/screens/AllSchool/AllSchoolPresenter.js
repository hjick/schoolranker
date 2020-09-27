import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import SchoolLists from "components/SchoolLists";
import SchoolPagination from "components/SchoolPagination";
import MyHelmet from "components/MyHelmet";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 3rem;
  transition: margin-left 0.3s ease;
  /* margin-left: ${({ showSidebar }) => showSidebar && "50px"}; */
`;
const Logo = styled.img`
  width: 360px;
  margin-bottom: 2rem;
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
  box-shadow: 0px 2px 2px 0 rgba(0, 0, 0, 0.2);
  &::placeholder {
    color: #9e9e9e;
  }
  &:focus {
    border: 2px solid #068389;
    box-shadow: 0 2px 2px 0 rgba(6, 131, 137, 0.5);
  }
  &:not([value=""]) {
    border: 2px solid #068389;
    box-shadow: 0 2px 2px 0 rgba(6, 131, 137, 0.4);
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
    color: #068389;
  }
`;

const AllSchoolPresenter = ({
  currentSchoolLists,
  schoolLists,
  isLoading,
  schoolListsPerPage,
  paginate,
  currentPage,
  schoolTerm,
  schoolTermHandler,
  handleSubmit,
  searchSchoolLists,
}) => {
  const view = useSelector((state) => state.view);
  const { showSidebar } = view;
  return (
    <>
      <MyHelmet title="스쿨랭커 | School Ranker" />

      <Container showSidebar={showSidebar}>
        <a href="/">
          <Logo src={`${process.env.PUBLIC_URL}/img/logo.png`} />
        </a>
        <form
          onSubmit={handleSubmit}
          style={{ width: "50%", position: "relative" }}
        >
          <SearchInput
            placeholder="학교이름을 입력해보세요 !"
            type="text"
            value={schoolTerm}
            onChange={schoolTermHandler}
          />

          <SearchBtn type="submit">
            <FontAwesomeIcon icon="search" />
          </SearchBtn>
        </form>

        <SchoolLists
          currentSchoolLists={currentSchoolLists}
          isLoading={isLoading}
          currentPage={currentPage}
          schoolListsPerPage={schoolListsPerPage}
          schoolLists={schoolLists}
          searchSchoolLists={searchSchoolLists}
        />
        <SchoolPagination
          schoolListsPerPage={schoolListsPerPage}
          totalSchoolLists={schoolLists.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Container>
    </>
  );
};

export default AllSchoolPresenter;
