import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Container, Title, LinkList, Header } from './post-styles';
import Share from '../components/share';

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
      frontmatter: { author, date, title },
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
            <sub
              css={`
                color: rgba(0, 0, 0, 0.8);
              `}
            >
              <span>
                Posted on {date} by {author}
              </span>
              <span>&nbsp; - &nbsp;</span>
              <span>{markdownRemark.fields.readingTime.text}</span>
            </sub>
          </Header>

          <div
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
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
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
      }
    }
  }
`;
