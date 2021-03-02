
import React from 'react'
import IndexLayout from '.';
import { Footer } from '../components/Footer';
import PageNav from '../components/header/PageNav';
import { SiteNavProps } from '../components/header/SiteNav';
import { Wrapper } from '../components/Wrapper';
import { inner, PostTemplate, SiteMain } from '../styles/shared';

const PageLayout:React.FC<SiteNavProps> = props => {
  return (
    <IndexLayout>
      <Wrapper css={PostTemplate}>
        <PageNav {...props}/>
        <main className="site-main" css={SiteMain}>
          <div css={inner}>
            {props.children}
          </div>
        </main>
        <Footer/>
      </Wrapper>
    </IndexLayout>
  )
}

export default PageLayout
