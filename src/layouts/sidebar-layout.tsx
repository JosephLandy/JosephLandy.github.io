import React, { useEffect, useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Sidebar, { SidebarProps } from 'react-sidebar';

import SiteNav from '../components/header/SiteNav';

import SidebarContent from '../components/SidebarContent';

interface Props {}

const Container = styled.div`
  /* ultra basic row layout to show sidebar */
  display: flex;
  height: 100%;
`;

const DockedWrapper = styled.div`
  z-index: 10000;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const ContentArea = styled.div`
  overflow: scroll;
  /* z-index: -1; */
  width: 100%;
`;

export const SidebarLayout: React.FC<Props> = props => {
  const docked = false;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // window.onkeydown = (ev: KeyboardEvent) => {
    //   console.log(ev.key);
    //   if (ev.key == "B") {
    //     setOpen(!open);
    //   }
    // }
    window.onresize = () => {
      // docked sidebar will be hidden when window width < 800.
      // I think I basically I want to make sure the sidebar is closed,
      // whenever the window is resized, but not trigger a re-render if
      // it's already closed. For some reason that's not working.
      if (open) {
        setOpen(false);
      }
    };

    return () => {
      window.onresize = null;
      // window.onkeydown = null;
    };
  });

  const sidebarContents = <SidebarContent />;
  const sidebarProps: SidebarProps = {
    sidebar: sidebarContents,
    // sidebar: <SidebarContent/>,
    docked,
    open,
    // open: true,
    styles: {
      sidebar: {
        zIndex: '1901281',
      },
    },
    transitions: !docked,
    onSetOpen: setOpen,
    shadow: true,
  };

  return (
    <Sidebar {...sidebarProps}>
      <SiteNav toggleOpen={() => setOpen(!open)} />
      <Container>
        {/* <DockedWrapper>
          <SidebarContent />
        </DockedWrapper> */}
        <ContentArea>
          {props.children}
        </ContentArea>
      </Container>
    </Sidebar>
  );
};

export default SidebarLayout;
