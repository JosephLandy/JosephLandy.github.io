import { lighten } from 'polished';

import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { colors } from './colors';

export const outer = css`
  position: relative;
  padding: 0 5vw;
`;

// Centered content container blocks
export const inner = css`
  margin: 0 auto;
  max-width: 1040px;
  width: 100%;
`;

export const SiteNavMain = css`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  background: ${lighten('-0.05', colors.darkgrey)};
`;

export const SiteMain = css`
  flex-grow: 1;
  /* @media (prefers-color-scheme: dark) { */
  // this doesn't do anything, so I'm commenting it out. background color is set in index layout.
  /* background: ${colors.darkmode}; */
  /* } */
`;
// gradient from elemental starter.
// color primary: "rgb(104, 136, 223)"
const cp = '#6888df';
// color secondary: "rgb(245, 85, 85)"
const cs = '#f55555';
export const SiteTitle = styled.h1`
  z-index: 10;
  margin: 0 0 0 -2px;
  padding: 0;
  font-size: 5rem;
  line-height: 1em;
  font-weight: 600;

  background: linear-gradient(0.25turn, ${cp}, ${cs});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 500px) {
    font-size: 4.2rem;
  }
`;

export const SiteDescription = styled.h2`
  z-index: 10;
  margin: 0;
  padding: 5px 0;
  font-size: 2.1rem;
  line-height: 1.4em;
  font-weight: 400;
  opacity: 0.8;

  @media (max-width: 500px) {
    font-size: 1.8rem;
  }
`;

export const Posts = css`
  overflow-x: hidden;
`;

export const PostFeed = css`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px;
  padding: 50px 0 0;
  background: ${colors.darkmode};
  /* Special Template Styles */
  padding: 40px 0 5vw;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;

export const SocialLink = css`
  display: inline-block;
  margin: 0;
  padding: 10px;
  opacity: 0.8;

  :hover {
    opacity: 1;
  }

  svg {
    height: 1.8rem;
    fill: #fff;
  }
`;

export const SocialLinkFb = css`
  svg {
    height: 1.6rem;
  }
`;

export const SiteHeaderContent = styled.div`
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6vw 3vw;
  min-height: 200px;
  max-height: 340px;
`;

// tag and author post lists
export const SiteArchiveHeader = css`
  .site-header-content {
    position: relative;
    align-items: stretch;
    padding: 12vw 0 20px;
    min-height: 200px;
    max-height: 600px;
  }
`;
// SiteHeaderBackground and ResponsiveHeaderBackground can probably be merged. 
// only applied on the tags page. 
export const SiteHeaderBackground = css`
  margin-top: 64px;
`;
// only applied on the tags page. 
export const ResponsiveHeaderBackground = styled.div<{ backgroundImage?: string }>`
  ${p =>
    p.backgroundImage &&
    `
    position: relative;
    margin-top: 64px;
    padding-bottom: 12px;
    color: #fff;
    background-size: cover;
    background: #090a0b no-repeat 50%;
    background-image: url(${p.backgroundImage});

    :before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 10;
      display: block;
      /* background: rgba(0, 0, 0, 0.18); */
    }

    :after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: auto;
      left: 0;
      z-index: 10;
      display: block;
      height: 140px;
      background: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0));
    }

    /* @media (prefers-color-scheme: dark) { */
      &:before {
        background: rgba(0, 0, 0, 0.6);
      }
    /* } */
  `}

  ${p =>
    !p.backgroundImage &&
    `

    padding-top: 0;
    padding-bottom: 0;
    // color: ${colors.darkgrey};
    // background: #fff;
    opacity: 1;


  .site-description {
    color: ${colors.midgrey};
    opacity: 1;
  }

  .site-header-content {
    padding: 5vw 0 10px;
    border-bottom: 1px solid ${lighten('0.12', colors.lightgrey)};
  }

  @media (max-width: 500px) {
    .site-header-content {
      flex-direction: column;
      align-items: center;
      min-height: unset;
    }

    .site-title {
      font-size: 4.2rem;
      text-align: center;
    }

    .site-header-content {
      padding: 12vw 0 20px;
    }
  }
  // I don't think this class does anything. 
  // @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.9);
    background: ${colors.darkmode};

    .site-header-content {
      border-bottom-color: ${lighten('0.15', colors.darkmode)};
    }
  // }
  `}
`;