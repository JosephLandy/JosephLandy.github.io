import React, { useEffect, useRef } from 'react';
import { Point } from '../utils';

interface Props {
  points: Point[];
  image?: HTMLImageElement | null;
  // setPoints: (value: React.SetStateAction<Point[]>) => void;
  style: PointStyle;
  clickHandler: React.MouseEventHandler<HTMLCanvasElement>;
}

export interface PointStyle {
  r: number;
  fill: string;
  font: string;
  fontFill: string;
}

const CanvasPoints: React.FC<Props> = ({ points, image, clickHandler, style }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

    if (image && canvasRef.current && ctx) {
      if (image.width > 1000) {
        const ratio = image.height / image.width;
        // image.width = 1000;
        // image.height = image.width * ratio;
        canvasRef.current.width = 1000;
        canvasRef.current.height = 1000 * ratio;
        ctx.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height);
      } else {
        canvasRef.current.width = image.width;
        canvasRef.current.height = image.height;
        ctx.drawImage(image, 0, 0);
      }

      // check that the image is initialized with a value.

      ctx.strokeStyle = style.fill;
      ctx.font = style.font;

      points.forEach((v, i, a) => {
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
    <canvas ref={canvasRef} onClick={clickHandler} style={{ display: 'block', marginTop: 20 }} />
  );
};

export default CanvasPoints;
