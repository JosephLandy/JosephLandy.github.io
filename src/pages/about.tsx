import React from 'react';
import { graphql, Link } from 'gatsby';

import { Helmet } from 'react-helmet';

import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { IconContext } from 'react-icons';
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
import { NoImage, PostFull, PostFullHeader, PostFullTitle, PostTemplate } from '../templates/post';
import { colors } from '../styles/colors';

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
            <FaEnvelope />
          </a>
        )}
      </div>
    </IconContext.Provider>
  );
};

const PointHeading = styled.h6`
  color: ${colors.blue} !important;
  font-family: Georgia, serif !important;
`;

// const AboutParagraph = styled.p`
//   width: 100%;
//   @media only screen and (min-width: 1041px) {
//     width: 10px;
//   }
// `;
const AboutParagraph = styled.div`
  width: 100%;
  @media only screen and (min-width: 1041px) {
    width: 50%;
  }

  font-weight: bold;
`;

const About: React.FC<AboutProps> = props => {
  const resized = props.data.file.childImageSharp.resize.src;

  // ok, so for whatever reason, the flex layout switches at 1040 px width, so that's what
  // were using for the breakpoint.
  return (
    <IndexLayout>
      <Helmet>
        <title>About</title>
      </Helmet>
      <Wrapper css={PostTemplate}>
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
                <PostFullTitle className="post-full-title">About Me</PostFullTitle>
              </PostFullHeader>

              <PostFullContent className="post-full-content">
                <div className="post-content">
                  <div
                    css={css`
                      display: flex;
                      flex-direction: row;
                      flex-wrap: wrap;
                      align-items: center;
                      justify-content: space-evenly;
                      /* padding: 0px; */
                      margin-bottom: 40px;

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
                    <AboutParagraph>
                      <PointHeading>Hey there!</PointHeading>
                      I'm a programmer with eclectic skills in computer graphics, visual effects,
                      game development, and web development, looking to apply my abilities to
                      support and solve the technical problems that face teams working in creative
                      fields.
                    </AboutParagraph>
                  </div>
                  <div>
                    <PointHeading>
                      <i>Where I'm at</i>
                    </PointHeading>{' '}
                    <p>
                      I graduated with a degree in computer science from Queen's University in 2019,
                      and I'm currently looking to enter the workforce after a gap.{' '}
                    </p>
                    <PointHeading>
                      <i>I love graphics, VFX, and game dev</i>
                    </PointHeading>{' '}
                    <p>
                      I first became interested in computer science in highschool experimenting with
                      vfx software such as Autodesk Maya. These early experiences gave me an indepth
                      understanding of the basic elements of the VFX pipeline, and a passion for
                      graphics that's stayed with me ever since.
                    </p>
                    <p>
                      I've studied graphics and game development extensively in school and backed it
                      up with experience working with labs at Queen's where I applied my skills to
                      help develop psychology experiments using virtual reality, eye tracking and
                      other technologies.
                    </p>
                    <PointHeading>
                      <i>But I also do web stuff</i>
                    </PointHeading>
                    <p>
                      I'm also proficient with frontend web development, primarily using ReactJS.
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
        resize(height: 512, width: 512, quality: 100) {
          src
        }
      }
    }
  }
`;

export default About;
