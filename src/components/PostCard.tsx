import { format } from 'date-fns';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
// import _ from 'lodash';
import { lighten } from 'polished';
import React from 'react';

import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { AiFillStar } from 'react-icons/ai';
import { IconContext } from 'react-icons';

import { colors } from '../styles/colors';
import { PageContext } from '../templates/post';

import PostCardLinks from './PostCardLinks';

export interface PostCardProps {
  post: PageContext;
  large?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, large = false }) => {
  // const date = new Date(post.frontmatter.date);
  // const datetime = format(date, 'yyyy-MM-dd');
  // const displayDatetime = format(date, 'dd LLL yyyy');

  return (
    <article
      className={`post-card ${post.frontmatter.image ? '' : 'no-image'} ${
        large ? 'post-card-large' : ''
      }`}
      css={[PostCardStyles, large && PostCardLarge]}
    >
      {post.frontmatter.image && (
        <Link className="post-card-image-link" css={PostCardImageLink} to={post.fields.slug}>
          <PostCardImage className="post-card-image">
            {post.frontmatter?.image?.childImageSharp?.fluid && (
              <Img
                alt={`${post.frontmatter.title} cover image`}
                style={{ height: '100%' }}
                fluid={post.frontmatter.image.childImageSharp.fluid}
              />
            )}
          </PostCardImage>
        </Link>
      )}
      <PostCardContent className="post-card-content">
        <Link className="post-card-content-link" css={PostCardContentLink} to={post.fields.slug}>
          <PostCardHeader className="post-card-header">
            {post.frontmatter.tags && (
              <PostCardPrimaryTag className="post-card-primary-tag">
                {/* {post.frontmatter.tags[0]} */}
                {post.frontmatter.tags.join(' ')}
              </PostCardPrimaryTag>
            )}

            <IconContext.Provider value={{ color: 'gold', size: '0.75em' }}>
              <PostCardTitle className="post-card-title">
                {post.frontmatter.featured && <AiFillStar/>} &nbsp;
                {post.frontmatter.title}
              </PostCardTitle>
            </IconContext.Provider>
          </PostCardHeader>
          <PostCardExcerpt className="post-card-excerpt">
            <p>{post.frontmatter.excerpt || post.excerpt}</p>
          </PostCardExcerpt>
        </Link>
        <PostCardMeta className="post-card-meta">
          <PostCardLinks github={post.frontmatter.github} website={post.frontmatter.website} />
          <PostCardBylineContent className="post-card-byline-content">
            <span className="post-card-byline-date">
              {/* <time dateTime={datetime}>{displayDatetime}</time>{' '} */}
              <span className="bull">&bull;</span> {post.timeToRead} min read
            </span>
          </PostCardBylineContent>
        </PostCardMeta>
      </PostCardContent>
    </article>
  );
};

const PostCardStyles = css`
  position: relative;
  flex: 1 1 301px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0 0 40px;
  padding: 0 20px 40px;
  min-height: 220px;
  border-bottom: 1px solid ${lighten('0.12', colors.lightgrey)};
  background-size: cover;

  /* @media (prefers-color-scheme: dark) { */
    border-bottom-color: ${lighten('0.08', colors.darkmode)};
  /* } */
`;

const PostCardLarge = css`
  @media (min-width: 795px) {
    flex: 1 1 100%;
    flex-direction: row;
    padding-bottom: 40px;
    min-height: 280px;
    border-top: 0;

    :not(.no-image) .post-card-header {
      margin-top: 0;
    }

    .post-card-image-link {
      position: relative;
      flex: 1 1 auto;
      margin-bottom: 0;
      min-height: 380px;
    }

    .post-card-image {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .post-card-content {
      flex: 0 1 361px;
      justify-content: center;
    }

    .post-card-title {
      margin-top: 0;
      font-size: 3.2rem;
    }

    .post-card-content-link {
      padding: 0 0 0 40px;
    }

    .post-card-meta {
      padding: 0 0 0 40px;
    }

    .post-card-excerpt p {
      margin-bottom: 1.5em;
      font-size: 1.8rem;
      line-height: 1.5em;
    }
  }
`;

const PostCardImageLink = css`
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 5px 5px 0 0;
`;

const PostCardImage = styled.div`
  width: auto;
  height: 200px;
  background: ${colors.lightgrey} no-repeat center center;
  background-size: cover;
`;

const PostCardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const PostCardContentLink = css`
  position: relative;
  display: block;
  color: ${colors.darkgrey};

  :hover {
    text-decoration: none;
  }
`;

const PostCardPrimaryTag = styled.div`
  margin: 0 0 0.2em;
  color: ${colors.blue};
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.2px;
  text-transform: uppercase;
`;

const PostCardTitle = styled.h2`
  margin: 0 0 0.4em;
  line-height: 1.15em;
  // transition isn't working for some reason. 
  transition: color 0.2s ease-in-out;

  /* @media (prefers-color-scheme: dark) { */
    color: rgba(255, 255, 255, 0.85);
  /* } */
`;

const PostCardExcerpt = styled.section`
  font-family: Georgia, serif;

  /* @media (prefers-color-scheme: dark) { */
    color: ${lighten('0.1', colors.midgrey)} !important;
  /* } */
`;

const PostCardMeta = styled.footer`
  display: flex;
  align-items: flex-start;
  padding: 0;
`;

const PostCardBylineContent = styled.div`
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  margin: 4px 0 0 10px;
  color: ${lighten('0.1', colors.midgrey)};
  font-size: 1.2rem;
  line-height: 1.4em;
  font-weight: 400;
  letter-spacing: 0.2px;
  text-transform: uppercase;

  span {
    margin: 0;
  }

  a {
    /* color: ${lighten('0.2', colors.darkgrey)}; */
    color: rgba(255, 255, 255, 0.75);
    font-weight: 600;
  }

  /* @media (prefers-color-scheme: dark) { */
    /* a {
      color: rgba(255, 255, 255, 0.75);
    } */
  /* } */
`;

const PostCardHeader = styled.header`
  margin: 15px 0 0;
`;
