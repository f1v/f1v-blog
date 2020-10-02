import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StyledLink from '../utils/styled-link';
import media from '../utils/media';
import Twitter from '../images/social/twitter.svg';
import LinkedIn from '../images/social/linkedin.svg';

const Container = styled.nav`
  align-items: center;
  background-color: var(--color-yellow);

  flex-basis: 70px;
  flex-grow: 0;
  flex-shrink: 0;
  height: 100vh;
  z-index: 1;
  flex-direction: column;
  justify-content: space-between;

  ${media.tablet`
    bottom: 0;
    height: auto;
    position: absolute;
    text-align: center;
    width: 100vw;

    .blog {
      display: none;
    }

    .social {
      display: none;
    }
  `}
`;

const Title = styled.div`
  color: #fff;
  display: flex;
  height: var(--size-sidebar-width);
  justify-content: center;
  text-align: center;
`;

const SubHeading = styled.div`
  border-top: 1px solid white;
  color: #fff;
  border-bottom: 1px solid white;
  letter-spacing: 5px;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  position: relative;
  height: 100px;
`;

const Rotate = styled.div`
  left: 4px;
  transform: rotate(-90deg);
  top: 40px;
  position: absolute;
`;
const SocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const TwitterIcon = styled.img`
  height: 25px;
  width: 25px;
  margin-top: 20px;
`;

const LinkedInIcon = styled.img`
  height: 25px;
  width: 25px;
  margin-top: 20px;
`;

const Header = ({ title }) => (
  <Container>
    <StyledLink to={'https://f1v.com/'} className="titlebar">
      <Title>
        <svg
          class=""
          viewBox="0 0 353 241"
          width="40px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M178.072 84.5507V240.004H128.807V121.833H78.2248V240.004H28.9598V121.833H0V84.5507H28.9598V74.8973C28.9598 25.9644 55.9224 0 100.86 0H111.845V45.6041H104.189C85.2151 45.6041 78.2248 55.5904 78.2248 69.9041V84.5507H178.072Z"
            fill="#fff"
          ></path>
          <path
            d="M353 85H299.333L265.667 177.27L231.667 85H178L244 240H287L353 85Z"
            fill="#fff"
          ></path>
        </svg>
      </Title>
    </StyledLink>
    <StyledLink to={'/'} className="blog">
      <SubHeading>
        <Rotate>Blog</Rotate>
      </SubHeading>
    </StyledLink>

    <SocialContainer className="social">
      <Link to="https://www.linkedin.com/company/f1v">
        <LinkedInIcon src={LinkedIn} alt="Linked In" />
      </Link>
      <Link to="https://twitter.com/f1v_developers">
        <TwitterIcon src={Twitter} alt="twitter" />
      </Link>
    </SocialContainer>
  </Container>
);

Header.defaultProps = {
  title: '',
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
