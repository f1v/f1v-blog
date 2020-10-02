import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import {
  Author,
  Container,
  Title,
  Time,
  LinkList,
  LinkItem,
  Header,
} from './post-styles';
import Share from '../components/share';
import StyledLink from '../utils/styled-link';

class BlogPostTemplate extends React.Component {
  render() {
    const {
      data,
      location,
      pageContext: { previous, next },
    } = this.props;
    const { markdownRemark, site } = data;
    const {
      excerpt,
      frontmatter: { author, author_site, date, title },
    } = markdownRemark;
    const {
      siteMetadata: { title: siteTitle },
    } = site;

    return (
      <Layout location={location} title={siteTitle}>
        <SEO title={title} description={excerpt} />
        <Container>
          <Header>
            <Title>{title}</Title>
            <sub css={``}>
              <span>
                Posted on {date} by{' '}
                <StyledLink to={author_site}>
                  <Author>{author}</Author>
                </StyledLink>
              </span>
              <span>&nbsp; &nbsp;</span>
              <Time>{markdownRemark.fields.readingTime.text}</Time>
            </sub>
          </Header>

          <div
            className="post-content"
            css={`
              margin: 5rem 0;
            `}
            dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
          />

          <Share
            post={{
              title,
              excerpt,
              author,
            }}
          />
          <LinkList>
            <LinkItem>
              {previous && (
                <StyledLink to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </StyledLink>
              )}
            </LinkItem>
            <LinkItem>
              {next && (
                <StyledLink to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </StyledLink>
              )}
            </LinkItem>
          </LinkList>
        </Container>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      fields {
        readingTime {
          text
        }
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        author
        author_site
      }
    }
  }
`;
