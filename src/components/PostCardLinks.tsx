import React from 'react';
import styled from '@emotion/styled';
import { MdWeb } from 'react-icons/md';
import { GoMarkGithub } from 'react-icons/go';
import { IconContext } from 'react-icons';

interface Props {
  github?: string;
  website?: string;
}

export const LinksUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 4px;
  padding: 0;
  list-style: none;
`;

export const PostCardLinks: React.FC<Props> = props => (
  <LinksUl className="links-icon-list">
    <IconContext.Provider
      value={{
        size: '2em',
        style: {
          margin: '5px',
        },
      }}
    >
      <div>
        {props.github && (
          <a href={props.github} target="_blank" rel="noopener noreferrer">
            <GoMarkGithub />
          </a>
        )}
        {props.website && (
          <a href={props.website} target="_blank" rel="noopener noreferrer">
            <MdWeb />
          </a>
        )}
      </div>
    </IconContext.Provider>
  </LinksUl>
);

export default PostCardLinks;
