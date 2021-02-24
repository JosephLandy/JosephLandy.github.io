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
import { inner, outer, SiteArchiveHeader, SiteMain, SiteNavMain } from '../styles/shared';
import { NoImage, PostFull, PostFullHeader, PostFullTitle, PostTemplate } from '../templates/post';
import { colors } from '../styles/colors';

interface Props {}

const mailCSS = css``;

const MailForm: React.FC<{}> = props => {
  return (
    <form css={mailCSS}>
      <label>
        Email
        <input type="email" name="email" />
      </label>
      <label>
        Name
        <input type="text" name="name" />
      </label>
      <label>
        Message
        <input type="text" name="message" />
      </label>
    </form>
  );
};

const Contact: React.FC<Props> = props => {
  return (
    <IndexLayout>
      <Wrapper>
        {/* <MailForm /> */}
      </Wrapper>
    </IndexLayout>
  );
};

export default Contact;
