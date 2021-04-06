import React, { useEffect, useState } from 'react';
import PageLayout from '../layouts/page-layout';
// import cardsImage from '../cardsOnGrid.png';
import { getMousePos, Point } from '../utils';

import CanvasPoints from '../components/CanvasPoints';

import { css } from '@emotion/core';
import { lighten } from 'polished';
import { colors } from '../styles/colors';
import CanvasWarped from '../components/CanvasWarped';
// import churchURL from '../images/church.jpeg';
// import perspectiveURL from '../images/perspective.png';
import cardsURL from '../images/cardsOnGrid.png';

// You can use this image for free without changing it as long you include the attribution below:
// https://bryanmmathers.com/perspective/
// https://bryanmmathers.com/wp-content/uploads/2016/10/perspective.png
// Perspective
// by @bryanMMathers
// is licenced under CC-BY-ND

// doing this in react is a huge pain in the ass.
// const imgURL =
//   'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Cortes_del_Condado_de_Wabash%2C_Wabash%2C_Indiana%2C_Estados_Unidos%2C_2012-11-12%2C_DD_01.jpg/1280px-Cortes_del_Condado_de_Wabash%2C_Wabash%2C_Indiana%2C_Estados_Unidos%2C_2012-11-12%2C_DD_01.jpg';

const imgURL = cardsURL;

interface Props {}

const PerspectiveWarp: React.FC<Props> = props => {
  const [srcPoints, setSrcPoints] = useState<Point[]>([]);
  const [targetPoints, setTargetPoints] = useState<Point[]>([]);
  const [showWarped, setShowWarped] = useState(false);

  const [url, setUrl] = useState(imgURL);
  const [image, setImage] = useState<HTMLImageElement>();

  useEffect(() => {
    let img = new Image();
    const load = async () => {
      try {
        await new Promise((resolve, reject) => {
          img.onload = e => {
            resolve(null);
          };
          img.src = url;
        });
        setSrcPoints([]); // reset the points array.
        setTargetPoints([]);
        setImage(img);
      } catch {
        console.error('something went wrong drawing the image.');
      }
    };
    load();
    return () => {
      // I think I can clean up state like this.
      img.onload = null;
      setSrcPoints([]);
      setTargetPoints([]);
      setImage(undefined);
    };
  }, [url]);

  const srcPointHandler: React.MouseEventHandler<HTMLCanvasElement> = e => {
    const p = getMousePos(e.currentTarget, e);
    setShowWarped(false);
    if (targetPoints.length != 0) {
      setTargetPoints([]);
    }
    setSrcPoints(prev => {
      if (prev.length >= 4) {
        return [];
      }
      return [...prev, p];
    });
  };

  const targetPointHandler: React.MouseEventHandler<HTMLCanvasElement> = e => {
    const mouseP = getMousePos(e.currentTarget, e);
    // I think I need to choose the bigger possible square.
    setShowWarped(false);
    setTargetPoints(prev => {
      // I need to build a square.
      switch (prev.length) {
        case 0:
          return [mouseP];
        case 1:
          return [...prev, { x: mouseP.x, y: prev[0].y }];
        case 2:
          // ok, so here we add 2 points, because the 4th point just completes the rectangle
          // with the first 3 assuming the click order is clockwise.
          return [...prev, { x: prev[1].x, y: mouseP.y }, { x: prev[0].x, y: mouseP.y }];
        case 4:
          return [];
        default:
          return [];
      }
    });
  };

  const handleFiles: React.ChangeEventHandler<HTMLInputElement> = e => {
    let files = e.target.files;
    if (files && files.length > 0) {
      setUrl(URL.createObjectURL(files[0]));
    }
  };

  // how the points are displayed.
  const srcStyle = { fill: '#fcba03', r: 6, font: '30px serif', fontFill: '#000' };
  const targStyle = { ...srcStyle, fill: '#be2de2' };

  return (
    <PageLayout>
      <div
        css={css`
          margin-top: 20px;
          button {
            margin-top: 10px;
            background-color: ${lighten('0.2', colors.darkgrey)};
            outline: none;
          }
          p {
            margin: 20px;
          }
        `}
      >
        <label
          css={css`
            padding: 40px;
          `}
        >
          Click here to upload an image.
          <input type="file" accept="image/*" onChange={handleFiles} />
        </label>

        <p>
          Click to select 4 points identifying a feature to display without perspective, in
          clockwise direction from top left corner.
        </p>
        <CanvasPoints
          points={srcPoints}
          clickHandler={srcPointHandler}
          image={image}
          style={srcStyle}
        />
        {srcPoints.length === 4 && (
          <>
            <p>
              Now select 4 coresponding points defining the rectangle the selected feature will
              occupy without perspective. 
            </p>
            <CanvasPoints
              points={targetPoints}
              clickHandler={targetPointHandler}
              image={image}
              style={targStyle}
            />
          </>
        )}
        {targetPoints.length === 4 && (
          <>
          <p>Click to compute and display the warped image. (May take a few seconds, especially with large images)</p>
          <button
            onClick={() => {
              setShowWarped(true);
            }}
          >
            Generate warped
          </button>
          </>
        )}
        {targetPoints.length === 4 && image && showWarped && (
          <CanvasWarped srcPoints={srcPoints} targPoints={targetPoints} image={image} style={targStyle}/>
        )}
        {/* <button
          onClick={() => {
            console.log('src points');
            console.log(srcPoints);
            console.log('target points');
            console.log(targetPoints);
          }}
        >
          print source plus target
        </button> */}
      </div>
    </PageLayout>
  );
};

export default PerspectiveWarp;
