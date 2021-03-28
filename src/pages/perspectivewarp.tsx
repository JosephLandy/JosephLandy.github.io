import React, { useRef, useEffect, useState } from 'react';
import image from '../cardsOnGrid.png';
import PageLayout from '../layouts/page-layout';

import { css } from '@emotion/core';

import cardsImage from '../cardsOnGrid.png';

// You can use this image for free without changing it as long you include the attribution below:
// https://bryanmmathers.com/perspective/
// https://bryanmmathers.com/wp-content/uploads/2016/10/perspective.png
// Perspective
// by @bryanMMathers
// is licenced under CC-BY-ND

const imgURL = 'https://bryanmmathers.com/wp-content/uploads/2016/10/perspective.png';
interface Props {}

// lets use a tuple here
// type Point = [number, number]
interface Point {
  x: number;
  y: number;
}

const PerspectiveWarp: React.FC<Props> = props => {

  const [loaded, setLoaded] = useState(false);
  const [points, setPoints] = useState<Point[]>([{ x: 100, y: 100 }]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (loaded) {
      let canvas = canvasRef.current;
      if (canvas) {
        if (img.width > 1000) {
          const ratio = img.height / img.width;
          img.width = 1000;
          img.height = img.width * ratio;
        }
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        points.forEach((p, i) => {
          ctx?.beginPath();
          ctx?.arc(p.x, p.y, 20, 0, 2 * Math.PI);
        });
      }
    }
    
  }, [loaded, points]);

  let img = new Image();
  img.addEventListener(
    'load',
    e => {
      console.log('image loaded');
      let canvas = canvasRef.current;
      if (canvas) {

        if (img.width > 1000) {
          const ratio = img.height / img.width;
          img.width = 1000;
          img.height = img.width * ratio;
        }
        canvas.width = img.width;
        canvas.height = img.height;
        setLoaded(true);
      }
    },
    false,
  );
  img.src = imgURL;

  return (
    <PageLayout>
      <div
        css={css`
          /* display: flex; */
          /* flex-direction: column; */
        `}
      >
        <label>
          Image url
          <input type="url" />
        </label>
        <button>load image</button>
        <canvas
          ref={canvasRef}
          onClick={e => {
            let canvas = canvasRef.current;
            if (canvas) {
              let ctx = canvas.getContext('2d');
            }
          }}
          style={{ display: 'block' }}
        />
      </div>
    </PageLayout>
  );
};

export default PerspectiveWarp;
