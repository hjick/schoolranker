import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FooterContainer = styled.footer`
  background-color: #eeeeee;
  color: #616161;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 124px;
  width: 100%;
  font-weight: 300;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
  width: 100%;
`;

const Logo = styled.div`
  font-family: "Do Hyeon", sans-serif;
  color: #35d0ba;
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const ToSNS = styled.a`
  &:hover {
    cursor: pointer;
  }
`;

const InstaIcon = styled(FontAwesomeIcon)`
  margin-left: 1rem;
  font-size: 1.4rem;
  &:hover {
    color: #d43e67;
  }
`;
const FacebookIcon = styled(FontAwesomeIcon)`
  margin-left: 1rem;
  font-size: 1.4rem;
  &:hover {
    color: #4267b2;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Logo>School Ranker</Logo>

        <div>
          <span>&copy; LEE HYUNJICK 2020. All Rights Reserved.</span>
          <ToSNS
            href="https://www.instagram.com/hjick_1/?hl=ko"
            target="_blank"
          >
            <InstaIcon icon={["fab", "instagram"]} />
          </ToSNS>
          <ToSNS href="/" target="_blank">
            <FacebookIcon icon={["fab", "facebook-square"]} />
          </ToSNS>
        </div>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
