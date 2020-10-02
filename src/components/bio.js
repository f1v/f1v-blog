import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import media from '../utils/media';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.tablet`
    flex-direction: column;
    text-align: center;
  `}
`;

const TextContainer = styled.div`
  ${media.phone`
    order: 2;
  `}
`;

const Name = styled.h1`
  letter-spacing: 0.1rem;
  font-weight: 400;
  margin-bottom: 1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const TagLine = styled.sub`
  font-weight: normal;
  font-size: 1.6rem;
  margin: 0;
  display: block;
`;

const Bio = () => (
  <StaticQuery
    query={bioQuery}
    render={(data) => {
      const { author, authorTagline } = data.site.siteMetadata;

      return (
        <Container>
          <TextContainer>
            <Name>{author}</Name>
            <TagLine>{authorTagline}</TagLine>
          </TextContainer>
        </Container>
      );
    }}
  />
);

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/f1v-logo.png/" }) {
      childImageSharp {
        fixed(width: 70, height: 70) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        authorTagline
        social {
          twitter
        }
      }
    }
  }
`;

export default Bio;
