import React from 'react';
import { outer, SiteNavMain } from "../../styles/shared";
import SiteNav, { SiteNavProps } from "./SiteNav";


const PageNav: React.FC<SiteNavProps> = props => {
  return (
    <div css={[outer, SiteNavMain]}>
      <SiteNav {...props} />
    </div>
  );
};

export default PageNav