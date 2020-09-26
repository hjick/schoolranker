import React from "react";
import styled from "styled-components";
import { Link as realLink, withRouter } from "react-router-dom";

const NavTag = styled.nav`
  /* background-color: #2fbaa5; */
  /* background-color: #068389; */
  background-color: #5c5c5e;
  color: #fff;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
`;

const List = styled.ul`
  display: flex;
  margin-left: 5rem;
`;

const Item = styled.li`
  height: 40px;
  width: 100%;
  margin: 0 1rem;
  text-align: center;
  border-bottom: 4px solid
    ${(props) => (props.current ? "#ffe194" : "transparent")};
  &:hover {
    border-bottom: 4px solid
      ${(props) => (props.current ? "#ffe194" : "#e0e0e0")};
  }
`;

const Link = styled(realLink)`
  width: 110px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Nav = ({ location: { pathname } }) => {
  return (
    <NavTag>
      <List>
        <Item current={pathname === "/"}>
          <Link to="/">학교별 랭킹</Link>
        </Item>
        {/* <Item current={pathname === "/myschool"}>
          <Link to="/myschool">우리학교는?</Link>
        </Item> */}
        <Item current={pathname === "/myrank"}>
          <Link to="/myrank">학교 내 랭킹</Link>
        </Item>
        {/* <Item current={pathname === "/searchfriends"}>
          <Link to="/searchfriends">친구 검색</Link>
        </Item> */}
      </List>
    </NavTag>
  );
};

export default withRouter(Nav);
