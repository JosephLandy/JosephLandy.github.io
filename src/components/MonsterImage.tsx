import { css } from '@emotion/core';
import React, { useState, useEffect } from 'react';

import forward from '../look_forward.png';
import left from '../look_left.png';
import right from '../look_right.png';

const images = [forward, left, forward, right];

const t = 2000;

const MonsterImage: React.FC = () => {
  const [srcindex, setSrcIndex] = useState(1);
  useEffect(() => {
    let interval = setInterval(() => {
      // console.log("interval fired");
      setSrcIndex(srcindex => (srcindex + 1) % images.length);
    }, t);
    return () => {
      // console.log('clearing interval'); // never seems to actually happen
      clearInterval(interval);
    };
  }, []);

  return (
    <img
      src={images[srcindex]}
      alt="Monster"
      css={css`
        /* opacity: 90%; // for some reason, opacity was reduced on images in IndexLayout
          I kind of like it reduced though. */
        width: 100%;
        max-width: 1000px;
      `}
    />
  );
};

export default MonsterImage
