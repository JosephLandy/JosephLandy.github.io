import React, { useEffect, useRef } from 'react';
import { Point } from '../utils';
import { create, all } from 'mathjs';

import { PointStyle } from './CanvasPoints';
import PixelManipulator from '../pixelmanipulator';

const math = create(all) as math.MathJsStatic;

function pointsToSystem(points: Point[]): [math.Matrix, math.Matrix] {
  let pHomog = points.map(v => [v.x, v.y, 1]); // turn the points into homogenous coordinates.
  let p4 = pHomog.pop();
  // p4 won't be undefined, but check anyway.
  if (!p4) {
    p4 = [];
  }
  // have to transpose this.
  // why am I rounding these values?
  // let M = math.transpose(math.round(math.matrix(pHomog)));
  let M = math.transpose(math.matrix(pHomog));
  // return [M, math.transpose(math.round(math.matrix(p4)))];
  return [M, math.transpose(math.matrix(p4))];
}

function buildTransform(points: Point[]): math.Matrix {
  // solve linear equation expressing 4th point as combination of first 3, in homogenous coordinates.
  let [A, p4] = pointsToSystem(points);
  // solution:
  let xhat = math.lusolve(A, p4) as math.Matrix;
  // can't make a matrix from a vector without turning it into a number[] for some reason.
  let xhat_a = math.flatten(xhat).toArray() as number[];
  let X = math.matrix([xhat_a, xhat_a, xhat_a]); // use this matrix to scale each column by it's coefficient.
  return math.dotMultiply(A, X) as math.Matrix;
  // this matrix maps the basis vectors to the specified points.
}

interface Props {
  srcPoints: Point[];
  targPoints: Point[];
  image: HTMLImageElement;
  style: PointStyle;
}

const CanvasWarped: React.FC<Props> = ({ srcPoints, targPoints, image, style }) => {
  // const destRef = useRef<HTMLCanvasElement>(null);
  const srcRef = useRef<HTMLCanvasElement>(null);

  // maps basis vectors to the source points
  let SRCMAT = buildTransform(srcPoints);
  // maps basis vectors to the target points.
  let DSTMAT = buildTransform(targPoints);

  // now we can use this to transform all the pixels.
  // maps from dest points back to basis vectors and then from basis vectors
  // back to source points. maps from points in the final image to points in the initial image.
  let M = math.multiply(SRCMAT, math.inv(DSTMAT));

  useEffect(() => {
    let w = image.width;
    let h = image.height;
    const ctx = srcRef.current?.getContext('2d');
    if (srcRef.current && ctx) {
      if (image.width > 1000) {
        const ratio = image.height / image.width;
        // image.width = 1000;
        w = 1000;
        // image.height = image.width * ratio;
        h = 1000 * ratio;

        srcRef.current.width = w;
        srcRef.current.height = h;
        ctx.drawImage(image, 0, 0, srcRef.current.width, srcRef.current.height);
      } else {
        srcRef.current.width = w;
        srcRef.current.height = h;
        ctx.drawImage(image, 0, 0);
      }

      let srcdata = ctx.getImageData(0, 0, w, h);
      let destdata = ctx.createImageData(srcdata);

      let srcpix = new PixelManipulator(srcdata);
      let destpix = new PixelManipulator(destdata);

      for (let y = 0; y < destpix.h; y++) {
        for (let x = 0; x < destpix.w; x++) {
          // homogenize this coordinate, then transform it.
          let destp_h = math.matrix([x, y, 1]);

          let srcph = math.multiply(M, destp_h).toArray() as number[];
          // now dehomogenize.
          let srcp = [srcph[0] / srcph[2], srcph[1] / srcph[2]];
          // let val = srcpix.pixel(Math.floor(srcp[0]), Math.floor(srcp[1]));
          if (!srcp[0] || !srcp[1]) {
            // since breakpoints/sourcemapping aren't working here for some reason. 
            console.error('Error! at CanvasWarped line 97');
          }
          // let val = srcpix.interpolatedPixel(srcp[0], srcp[1]);
          let val = srcpix.pixel(srcp[0], srcp[1])
          destpix.setPixel(x, y, val);
        }
      }

      ctx.putImageData(destdata, 0, 0);
      // now draw the area.
      ctx.strokeStyle = style.fill;
      ctx.font = style.font;
      targPoints.forEach((v, i, a) => {
        ctx.fillStyle = style.fill;
        if (i > 0) {
          ctx.beginPath();
          ctx.moveTo(v.x, v.y);
          ctx.lineTo(a[i - 1].x, a[i - 1].y);
          if (i == 3) {
            ctx.moveTo(v.x, v.y);
            ctx.lineTo(a[0].x, a[0].y);
          }
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(v.x, v.y, style.r, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = style.fontFill;
        ctx.fillText(i.toString(), v.x + style.r + 3, v.y);
      });
    }
  });

  return (
    <canvas
      ref={srcRef}
      style={{
        marginTop: 20,
      }}
    />
  );
};

export default CanvasWarped;
