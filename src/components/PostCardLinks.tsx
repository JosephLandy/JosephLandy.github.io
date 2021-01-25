import React from 'react';
// import styled from '@emotion/styled';
import styled from '@emotion/styled';
import { MdWeb } from 'react-icons/md';
import { GoMarkGithub } from 'react-icons/go';
import { IconContext } from 'react-icons';

// import {AuthorListUl} from './AuthorList'
interface Props {
  github?: string;
  website?: string;
}

export const AuthorListUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 4px;
  padding: 0;
  list-style: none;
`;

export const PostCardLinks: React.FC<Props> = props => (
   <AuthorListUl className="author-list">
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
            <a href={props.github}>
              <GoMarkGithub />
            </a>
          )}
          {props.website && (
            <a href={props.website}>
              <MdWeb />
            </a>
          )}
        </div>
      </IconContext.Provider>
   </AuthorListUl>
);

// export const LinkItem: React.FC<{}> = props => (

// )



export default PostCardLinks;
