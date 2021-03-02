import { graphql, Link, StaticQuery } from 'gatsby';
import React from 'react';
import { css } from '@emotion/core';
import { FixedObject } from 'gatsby-image';
import { SiteTitle } from '../../styles/shared';

interface SiteNavLogoProps {
  logo?: {
    childImageSharp: {
      fixed: FixedObject;
    };
  };
}

export const SiteNavLogo = () => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        logo: file(relativePath: { eq: "img/ghost-logo.png" }) {
          childImageSharp {
            fixed(quality: 100 width: 500) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={(data: SiteNavLogoProps) => (
      <Link className="site-nav-logo" css={[SiteNavLogoStyles, SiteTitle]} to="/">
        {/* {data.logo ? (
          <img src={data.logo.childImageSharp.fixed.src} alt={config.title} />
        ) : (
          config.title
        )} */}
        Joseph Landy
      </Link>
    )}
  />
);

// color primary: "rgb(104, 136, 223)"
const cp = '#6888df';
// color secondary: "rgb(245, 85, 85)"
const cs = '#f55555';
const SiteNavLogoStyles = css`
  position: relative;
  z-index: 100;
  flex-shrink: 0;
  display: inline-block;
  margin-right: 32px;
  padding: 12px 0;
  color: #fff;
  font-size: 1.7rem;
  line-height: 1.8rem;
  font-weight: bold;
  letter-spacing: -0.5px;
  text-transform: none;

  :hover {
    text-decoration: none;
  }

  img {
    display: block;
    width: auto;
    height: 21px;
  }

  background: linear-gradient(0.25turn, ${cp}, ${cs});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

