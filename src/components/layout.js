import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Header from './header';
import media from '../utils/media';
import GlobalFonts from '../fonts/Graphik';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,500,700,900|Roboto+Slab:100,300,400,700|Ubuntu:300,400,500,700&display=swap');

  :root {
    --color-blue: #14c2e7;
    --color-purple: #543ac1;
    --color-red: #f65e23;
    --color-white: white;
    --color-yellow: #e9b20a;

    --color-black: #272d36;
    --color-grey-darkest: #404854; /* #424141; */
    --color-grey-darker: #78828e; /* #9499a2; */
    --color-grey-dark: #919aa7; /* #9499a2; */
    --color-grey: #aebecb;
    --color-grey-light: #d7e5e7;
    --color-grey-lighter: #ebf2f3;
    --color-grey-lightest: #f7f9fa;

    --color-background-default: #000016;
    --color-text-default: #ffffff;
    --color-link-default: --color-text-default;
    --font-brand: 'Georgia', serif;
    --font-sans: 'Graphik', 'Roboto Bold', 'Helvetica Neue', sans;
    --font-serif: 'Roboto Slab', serif;

    --font-default: var(--font-sans);
    --size-sidebar-width: 70px;
  }

  body {
    font-family: var(--font-default);
    margin: 0;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    position: relative;
    font-size: 1.6rem;
    color: #fff;
  }

  h1,h2,h3,h4,h5,h6 {
    font-weight: 400;
  }

  h2 {
    font-size: 2.5rem;
    color: var(--color-red);
  }

  h3 {
    font-size: 2.4rem;
    color: var(--color-yellow);
  }

  h4 {
    font-size: 1.6rem;
    color: var(--color-yellow);
  }

  code,
  code[class*="language-"], pre[class*="language-text"] {
    font-family: Menlo,Monaco,"Courier New",Courier,monospace;
    font-size: 20px;
  }

  pre code {
    word-break: normal;
  }

  :not(pre) > code[class*="language-"], pre[class*="language-text"] {
    font-family: Menlo,Monaco,"Courier New",Courier,monospace;
    border-radius: 0;
    background-color: var(--color-grey-darkest);
    color: var(--color-yellow);
    font-size: medium;
    font-style: italic;
    padding: 4px 8px;
  }

  .post-content li {
    padding: 5px 0;
  }

  .post-content a {
    color: var(--color-yellow);
    line-height: 30px;
  }

`;

const Background = styled.div`
  .area {
    background: var(--color-grey-darkest);
    background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
    position: absolute;
    width: 100%;
    height: 100vh;
  }

  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
  }

  .circles li {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(248, 197, 85, 0.15);
    animation: animate 25s linear infinite;
    bottom: -150px;
  }

  .circles li:nth-child(1) {
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
  }

  .circles li:nth-child(2) {
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
  }

  .circles li:nth-child(3) {
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
  }

  .circles li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
  }

  .circles li:nth-child(5) {
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
  }

  .circles li:nth-child(6) {
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
  }

  .circles li:nth-child(7) {
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
  }

  .circles li:nth-child(8) {
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
  }

  .circles li:nth-child(9) {
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
  }

  .circles li:nth-child(10) {
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
  }

  @keyframes animate {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 0;
    }

    100% {
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0;
      border-radius: 50%;
    }
  }
`;

const Footer = styled.footer`
  display: block;
  height: 6rem;
`;

const Content = styled.div`
  ${media.tablet`
    width: 80%;
  `}
`;

const Body = styled.div`
  height: 100vh;
  padding: 0 10%;
  position: relative;
  overflow: scroll;

  ${media.tablet`
    width: 80%;
  `}
`;

const Flex = styled.div`
  display: flex;
  ${media.tablet`
    flex-direction: column;
  `}
`;

class Layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={(data) => (
          <Flex>
            <GlobalFonts />
            <Header title={data.site.siteMetadata.title} />
            <Background>
              <div class="area">
                <ul class="circles">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </Background>
            <Body>
              <Content>{children}</Content>
              <Footer />
            </Body>
            <GlobalStyles />
          </Flex>
        )}
      />
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
