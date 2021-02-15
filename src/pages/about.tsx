import React from 'react';
import { graphql, Link } from 'gatsby';

import { Helmet } from 'react-helmet';

import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { IconContext } from 'react-icons';
import { GoMarkGithub } from 'react-icons/go';
// import { FaLinkedin } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { GoThreeBars } from 'react-icons/go';
import { FaLinkedin, FaInstagram, FaEnvelope, FaGithubSquare } from 'react-icons/fa';

import config from '../website-config';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { PostFullContent } from '../components/PostContent';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  SiteArchiveHeader,
  SiteHeader,
  SiteMain,
  SiteNavMain,
} from '../styles/shared';
import { NoImage, PostFull, PostFullHeader, PostFullTitle } from '../templates/post';
import { colors } from '../styles/colors';

const PageTemplate = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
    background: #fff;
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      /* background: var(--darkmode); */
      background: ${colors.darkmode};
    }
  }
`;

interface AboutProps {
  data: {
    site: {
      siteMetadata: {
        description: string;
      };
    };
    file: {
      dir: string;
      childImageSharp: {
        resize: {
          src: string;
        };
      };
    };
  };
}

const LinkIcons: React.FC = () => {
  return (
    <IconContext.Provider value={{}}>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          font-size: 4em;

          a {
            
          }
        `}
      >
        {config.github && (
          <a href={config.github} title="Github" target="_blank" rel="noopener noreferrer">
            {/* <GoMarkGithub /> */}
            <FaGithubSquare />
          </a>
        )}
        {config.linkedin && (
          <a href={config.linkedin} title="LinkedIn" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        )}
        {config.email && (
          <a href={`mailto:${config.email}`} title="Email">
            {/* <FiMail /> */}
            <FaEnvelope />
          </a>
        )}
      </div>
    </IconContext.Provider>
  );
};

const About: React.FC<AboutProps> = props => {
  const resized = props.data.file.childImageSharp.resize.src;

  return (
    <IndexLayout>
      <Helmet>
        <title>About</title>
      </Helmet>
      <Wrapper css={PageTemplate}>
        <header className="site-archive-header no-image" css={[SiteHeader, SiteArchiveHeader]}>
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isHome={false} />
            </div>
          </div>
        </header>
        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <article className="post page" css={[PostFull, NoImage]}>
              <PostFullHeader className="post-full-header">
                <PostFullTitle className="post-full-title">About</PostFullTitle>
              </PostFullHeader>

              <PostFullContent className="post-full-content">
                <div className="post-content">
                  {/* <h5>
                    A starter template for Gatsby <br /> GitHub:{' '}
                    <a href="https://github.com/scttcper/gatsby-casper">scttcper/gatsby-casper</a>
                  </h5> */}
                  <div
                    css={css`
                      display: flex;
                      flex-direction: row;
                      flex-wrap: wrap;
                      align-items: center;
                      justify-content: space-evenly;
                      /* padding: 0px; */
                      /* margin: 0px; */
                      margin-bottom: 20px;

                      & > p {
                        margin: 0px;
                        padding: 0px;
                        min-width: 50%;
                      }

                      & > img {
                        margin: 0px;
                        padding: 0px;
                        border-radius: 50%;
                        /* flex-basis: 50%; */
                      }
                    `}
                  >
                    <img src={resized} height="256" width="256" />
                    <p className="evil-paragraph" style={{ width: '10px' }}>
                      Hey there! I graduated with a degree in computer science from Queen's
                      University in 2019, and I'm currently looking to enter the workforce after a
                      brief gap. I have a long interest in graphics, game development and visual
                      effects. I first became interested in computer science in highschool when I
                      experimented with vfx software such as autodesk maya. Since then I've studied
                      graphics and 3d extensively in school and backed it up with experience working
                      with labs at Queen's with VR, eye tracking and other technologies for
                      psychology experiments. I also enjoy web development!
                    </p>
                  </div>
                  <p>
                    <b>
                      Feel free to checkout my Github, connect with me on LinkedIn or send me an
                      email.
                    </b>
                  </p>
                  <LinkIcons />
                </div>
              </PostFullContent>
            </article>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export const aboutQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        description
      }
    }
    file(relativePath: { eq: "img/portrait_current_reduced.jpg" }) {
      dir
      childImageSharp {
        resize(height: 256, width: 256, quality: 100) {
          src
        }
      }
    }
  }
`;

export default About;
