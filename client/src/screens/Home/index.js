import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100vh;

  /* Sidebar */

  transition: margin-left 0.3s ease;
  margin-left: ${({ showSidebar }) => showSidebar && "50px"};
`;

const Logo = styled.div`
  font-family: "Do Hyeon", sans-serif;
  color: #35d0ba;
  font-size: 4rem;
  margin-bottom: 2.5rem;
  margin-top: 3rem;
  text-align: center;
`;

const Home = () => {
  const view = useSelector((state) => state.view);
  const { showSidebar } = view;
  return (
    <Container showSidebar={showSidebar}>
      <Logo>School RanKer</Logo>
    </Container>
  );
};

export default Home;
