import * as React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from "../components/Layout";

import { blogPost, postGrid, postTitle, postDate, postBody } from "./blog.module.css";

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="My Blog Posts">
      {data.allMdx.nodes.map((node) => (
        <article className={`${blogPost} ${postGrid}`} key={node.id}>
          <h2 className={postTitle}>{node.frontmatter.title}</h2>
          <p className={postDate}>Posted: {node.frontmatter.date}</p>
          <p className={postBody}>
            <MDXRenderer>{node.body}</MDXRenderer>
          </p>
        </article>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        }
        id
        body
      }
    }
  }
`;

export default BlogPage;
