import React from 'react';
// import { css } from '@emotion/core';
import styled from '@emotion/styled';

import Layout from '../layouts'

interface Props {}
// [576, 768, 992, 1200];
const mq = {
  sm: '@media (min-width: 576px)',
  md: '@media (min-width: 768px)',
  lg: '@media (min-width: 992px)',
  xl: '@media (min-width: 1200px)',
};

const TopLayout = styled.div`
  display: grid;
  grid-template-areas:
    'sidebar header header header'
    'sidebar content content content'
    'sidebar footer footer footer';
  background-color: #2196F3;

  grid-gap: 10px;
  min-height: 100vh;

  * {
    /* padding: 10px; */
  }
  /* ${mq.lg} {
    grid-template-areas:
      'sidebar header header header'
      'sidebar content content content'
      'sidebar footer footer footer';
  } */
`;

const Header = styled.div`
  grid-area: header;
  background-color: green;
`;

const Footer = styled.div`
  grid-area: footer;
  background-color: blue;
`;

const Content = styled.div`
  grid-area: content;
  background-color: orange;
`;

const Sidebar = styled.div`
  grid-area: sidebar;
  background-color: yellow;
`;

const GridPage:React.FC<Props> = props => {
  return (
    
    <Layout>
      <TopLayout>
        <Header>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil provident quis deleniti aliquid, reiciendis similique velit facilis voluptatum, molestiae obcaecati beatae iste alias optio voluptates dolorem ad odit expedita inventore!</Header>
        <Footer>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur minus minima numquam reiciendis impedit debitis eligendi cum ut incidunt, magnam inventore dolorum quod! Deserunt expedita esse voluptatibus voluptas facere minus.</Footer>
        <Content>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur minus minima numquam reiciendis impedit debitis eligendi cum ut incidunt, magnam inventore dolorum quod! Deserunt expedita esse voluptatibus voluptas facere minus.</Content>
        <Sidebar>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur minus minima numquam reiciendis impedit debitis eligendi cum ut incidunt, magnam inventore dolorum quod! Deserunt expedita esse voluptatibus voluptas facere minus.</Sidebar>
      </TopLayout>
    </Layout>
  );
};

export default GridPage;
