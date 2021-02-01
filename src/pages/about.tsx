import { graphql, useStaticQuery } from 'gatsby';

import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/core';

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
import { IconContext } from 'react-icons/lib';
import { GoMarkGithub } from 'react-icons/go';
import { FaLinkedin } from 'react-icons/fa';
import { GoThreeBars } from 'react-icons/go';
import { FiMail } from 'react-icons/fi';

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

const ContactButtons: React.FC = () => (
  <IconContext.Provider value={{ size: '6em' }}>
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        
        .no-underline
      `}
    >
      <a href={config.github} className="no-underline">
        <GoMarkGithub />
      </a>
      <a href={config.linkedin}>
        <FaLinkedin />
      </a>
      <a href={`mailto:${config.email}`}>
        <FiMail />
      </a>
    </div>
  </IconContext.Provider>
);

type AboutProps = {
  file: {
    childImageSharp: {
      resize: {
        src: string;
      };
    };
  };
};

const About: React.FC<AboutProps> = props => {
  
  const resized = props.file.childImageSharp.resize.src;

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
                  About Me
                </h5> */}
                  <p>
                    I graduated with a degree in computer science from Queen's Unviersity in 2019,
                    and I'm currently looking for work in. I have a long interest in computer
                    graphics, game development and visual effects. I also enjoy web development!
                  </p>
                  <img src={resized} alt="" />
                  <p>
                    Vestibulum semper pretium ipsum nec congue. Ut ac eros nisi. Donec leo sem,
                    aliquam mollis sapien ultrices, dapibus congue diam. Proin viverra dapibus
                    blandit. Ut mauris tellus, tristique id felis vel, venenatis vestibulum nunc.
                    Nam molestie pulvinar nibh, eget egestas augue. Maecenas tellus arcu, mattis ut
                    ipsum non, sollicitudin convallis nunc. Donec nec neque tristique, aliquet lacus
                    id, laoreet nunc. Cras dapibus nisi nulla, ullamcorper faucibus neque suscipit
                    ac. Donec eget orci venenatis justo lobortis volutpat. Proin vel placerat nisl.
                    Integer arcu nunc, sodales eu fringilla non, aliquam non diam. Cras placerat,
                    massa et faucibus pretium, ante elit tincidunt tellus, tristique ultricies velit
                    quam et massa.
                  </p>
                </div>

                <ContactButtons />
              </PostFullContent>
            </article>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};


// const ProfileImage: React.FC<{w: number, h: number}> = (w, h) => {
//   // const data: AboutProps = useStaticQuery(graphql`
//   //   {
//   //     # image is square, and 2048 per side.
//   //     # quality is integer between 1 and 100. Since I had already reduced the quality,
//   //     # I think having the quality below 100 was causing artefacts. Default is 50.
//   //     file(relativePath: { eq: "img/portrait_current_reduced.jpg" }) {
//   //       childImageSharp {
//   //         resize(height: 256, width: 256, quality: 100) {
//   //           src
//   //         }
//   //       }
//   //     }
//   //   }
//   // `);
//   const resized = data.file.childImageSharp.resize.src;
//   return (
//     <img
//       style={{ borderRadius: '50%', marginBottom: '10%' }}
//       src={resized}
//       height="256"
//       width="256"
//     />
//   );
// }

export const pageQuery = graphql`
  {
    # image is square, and 2048 per side.
    # quality is integer between 1 and 100. Since I had already reduced the quality,
    # I think having the quality below 100 was causing artefacts. Default is 50.
    file(relativePath: { eq: "img/portrait_current_reduced.jpg" }) {
      childImageSharp {
        resize(height: 256, width: 256, quality: 100) {
          src
        }
      }
    }
  }
`;

export default About;
