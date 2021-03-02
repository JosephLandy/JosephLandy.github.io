
import React from 'react';
import { lighten } from 'polished';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
// import { FaLinkedin, FaInstagram, FaEnvelope, FaGithubSquare } from 'react-icons/fa';
import { FaLinkedin, FaGithubSquare } from 'react-icons/fa';
import config from '../website-config';
import { PostFullContent } from '../components/PostContent';
import { NoImage, PostFull, PostFullHeader, PostFullTitle } from '../templates/post';
import { colors } from '../styles/colors';
import PageLayout from '../layouts/page-layout';

// import email_image from '../email_image.png';

interface Props {}

const MailForm = styled.form`
  display: flex;
  flex-direction: column;
  label {
    display: block;
    font-family: sans-serif;
    margin-bottom: 10px;
  }
  input,
  textarea {
    width: 100%;
    background-color: ${lighten('-0.05', colors.darkgrey)};
    font-family: serif;
    border-width: 0px;
    border-radius: 0px;
    outline: none; // I hate that blue glow.
    padding: 10px;
  }
  input[type='text'],
  input[type='email'] {
  }
  button {
    margin-top: 10px;
    background-color: ${lighten('0.2', colors.darkgrey)};
    outline: none;
  }
`;

const LinkIcons: React.FC = () => {
  return (
    <div
      css={css`
        text-decoration: none;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        font-size: 4em;
        margin-bottom: 20px;
        a {
          text-decoration: none !important;
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
      {/* {config.email && (
        <a href={`mailto:${config.email}`} title="Email">
          <FaEnvelope />
        </a>
      )} */}
    </div>
  );
};

const Contact: React.FC<Props> = props => {
  return (
    <PageLayout>
      <article className="post page" css={[PostFull, NoImage]}>
        <PostFullHeader className="post-full-header">
          <PostFullTitle className="post-full-title">Contact</PostFullTitle>
        </PostFullHeader>
        <PostFullContent>
          <p
          // css={css`
          //   img {
          //     display: inline;
          //     filter: invert(100%);
          //   }
          // `}
          >
            Feel free to check out my github, connect with me on LinkedIn or send me an email using
            the form below.
            {/* <img
                      src={email_image}
                      width={256}
                    /> */}
          </p>
          <LinkIcons />
          <MailForm
            method="post"
            action={
              process.env.NODE_ENV === 'production'
                ? 'https://getform.io/f/cc710c8d-d34e-4d75-ac2f-a5f0241d64c8'
                : ''
            }
          >
            <label>
              Name
              <input type="text" name="name" id="name" />
            </label>
            <label>
              Email
              <input type="email" name="email" id="email" />
            </label>
            <label>
              Subject
              <input type="text" name="subject" id="subject" />
            </label>
            <label>
              Message
              <textarea name="message" id="message" rows={5} />
            </label>
            <button type="submit">Submit</button>
          </MailForm>
        </PostFullContent>
      </article>
    </PageLayout>
  );
};

export default Contact;
