import React from 'react';
import styled from '@emotion/styled';

const ContentArea = styled.div`
  overflow: scroll;
  /* z-index: -1; */
  width: 100%;
`;

const Content = styled.div`
  /* this sort of causes problems with the index page layout, 
  because it overrides the margins specified on the child. Nope, that doesn't happen normally */
  /* z-index: -3; */
  /* & > * {
    margin: 100px;
  } */
`;

const ContentLayout: React.FC = ({ children }) => {
  return (
    <ContentArea>
      {/* <Background /> */}
      {/* {children} */}
      {/* <SiteNav /> */}
      <Content>{children}</Content>
    </ContentArea>
  );
};

export default ContentLayout;
