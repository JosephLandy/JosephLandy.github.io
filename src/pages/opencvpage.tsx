import React, { useEffect, useRef } from 'react';
// import mirada from 'mirada' // this seems to import cv as well.
import { css } from '@emotion/core';
// import * as cv from 'mirada';
// import cvjl from 'mirada';
// import cv from 'opencv.js';
// import {loadMirada} from 'mirada';
// this whole mirada thing is a mess.
// import cv from 'mirada';
import mirada from 'mirada';
// cv.

// import { useOpenCv } from 'opencv-react';
// import {imread} from 'opencv.js'
// import cv from 'opencv.js'

import cat from './cat.jpg';
// import * as cv from 'mirada';

// cv.load

// type CVT = typeof import("/Users/josephlandy/webdev/gatsby/website-casper/node_modules/mirada/dist/src/types/opencv/_types") & {
//     FS: mirada.FS;
// }

interface Props {}

const OpenCVPage = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // const { loaded, cv }: {loaded: any, cv: CVT} = useOpenCv();
  // useEffect(() => {
  //   if (cv) {
  //     console.log('opencv loaded')
  //     // const mat = cv.imread()
  //     return () => {};
  //   }
  // }, [cv]); // I think this means that the effect will only run when cv changes.

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <img
        src={cat}
        ref={imgRef}
        css={css`
          display: none;
        `}
      />
      {/* open cv did this work? */}
      <canvas ref={canvasRef} />
    </div>
  );
};

export default OpenCVPage;
