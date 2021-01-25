import React from 'react';
import styled from '@emotion/styled';
import { Link, graphql, useStaticQuery } from 'gatsby';
// import { colors } from '../styles/variables';
import { FaLinkedin, FaInstagram, FaEnvelope, FaGithubSquare } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import HeadingText from './HeadingText';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  /* background-color: ${colors.darkback}; */
  background-color: #000;
  color: #dcdcdc;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  h1 {
    color: inherit;
  }
`;

type Data = {
  file: {
    childImageSharp: {
      resize: {
        src: string;
      };
    };
  };
};

const SocialsContainer = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-evenly;
  margin-top: 25px;
  /* & refers to the original element. Space ' ' selects descendents */
  /* so this should select all descendents of the SocialsContainer */
  & * {
    /* size: 10em; */
    color: green;
  }
`;

const SidebarContent: React.FC = () => {
  const data: Data = useStaticQuery(graphql`
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
  `);
  const resized = data.file.childImageSharp.resize.src;
  return (
    <SidebarContainer>
      <img
        style={{ borderRadius: '50%', marginBottom: '10%' }}
        src={resized}
        height="256"
        width="256"
      />
      <Link to="/">
        <HeadingText>Joseph Landy</HeadingText>
      </Link>
      {/* <div> */}
      <Link to="/about/">About</Link>
      <Link to="/projects/">Projects</Link>
      <Link to="/contact/">Contacts</Link>
      {/* </div> */}
      <SocialsContainer>
        <IconContext.Provider value={{ color: 'green', size: '2em' }}>
          <a>
            <FaLinkedin />
          </a>
          <a>
            <FaInstagram />
          </a>
          <a href="mailto:joseph.landy.email@gmail.com">
            <FaEnvelope />
          </a>
          <a href="">
            <FaGithubSquare />
          </a>
        </IconContext.Provider>
      </SocialsContainer>
    </SidebarContainer>
  );
};

export default SidebarContent;
