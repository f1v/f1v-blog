import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StyledLink from '../utils/styled-link';
import media from '../utils/media';

const Container = styled.div`
  padding: 1rem 0;
  margin: 1rem 0;
  line-height: 1.5;

  &:first-child {
    margin-top: 0;
  }

  ${media.phone`
    margin: 0.5rem 0;
    padding: 0.4rem 0;
  `}
`;

const Title = styled.h4`
  color: var(--color-yellow);
  line-height: initial;
  margin-bottom: 0;
`;

const Time = styled.span`
  background-color: var(--color-yellow);
  color: var(--color-white);
  padding: 8px 10px;
`;

const Post = ({ node }) => (
  <StyledLink to={node.fields.slug}>
    <Container>
      <Title>{node.frontmatter.title}</Title>
      <sub>
        <span>{node.frontmatter.date}</span>
        <span>&nbsp; &nbsp;</span>
        <Time>{node.fields.readingTime.text}</Time>
      </sub>
      <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
    </Container>
  </StyledLink>
);

Post.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }),
    fields: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }),
    excerpt: PropTypes.string.isRequired,
  }),
};

export default Post;
