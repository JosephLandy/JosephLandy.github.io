import React, { useEffect, useState } from 'react';
import PageLayout from '../layouts/page-layout';

import CanvasPoints from '../components/CanvasPoints';

// import fileURL from '../images/church.jpeg';
import fileURL from '../images/cardsOnGrid.png';

import { css } from '@emotion/core';
import { lighten } from 'polished';
import { colors } from '../styles/colors';
import CanvasWarped from '../components/CanvasWarped';

// You can use this image for free without changing it as long you include the attribution below:
// https://bryanmmathers.com/perspective/
// https://bryanmmathers.com/wp-content/uploads/2016/10/perspective.png
// Perspective
// by @bryanMMathers
// is licenced under CC-BY-ND

// doing this in react is a huge pain in the ass.
// const imgURL =
//   'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Cortes_del_Condado_de_Wabash%2C_Wabash%2C_Indiana%2C_Estados_Unidos%2C_2012-11-12%2C_DD_01.jpg/1280px-Cortes_del_Condado_de_Wabash%2C_Wabash%2C_Indiana%2C_Estados_Unidos%2C_2012-11-12%2C_DD_01.jpg';
const imgURL = fileURL;

interface Props {}

const srcPoints = [
  {
    x: 544.46875,
    y: 387.1953125,
  },
  {
    x: 419.109375,
    y: 493.8125,
  },
  {
    x: 424.69921875,
    y: 641.41015625,
  },
  {
    x: 557.05078125,
    y: 602.1328125,
  },
];
const targetPoints = [
  {
    x: 357.76953125,
    y: 380.62890625,
  },
  {
    x: 600.11328125,
    y: 380.62890625,
  },
  {
    x: 600.11328125,
    y: 547.90625,
  },
  {
    x: 357.76953125,
    y: 547.90625,
  },
];

const PerspectiveWarp: React.FC<Props> = props => {
  // const [srcPoints, setSrcPoints] = useState<Point[]>([]);
  // const [targetPoints, setTargetPoints] = useState<Point[]>([]);
  // const [showWarped, setShowWarped] = useState(false);

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
        setImage(img);
      } catch {
        console.error('something went wrong drawing the image.');
      }
    };
    load();
    return () => {
      // I think I can clean up state like this.
      img.onload = null;
    };
  }, [url]);

  const srcPointHandler: React.MouseEventHandler<HTMLCanvasElement> = e => {};

  const targetPointHandler: React.MouseEventHandler<HTMLCanvasElement> = e => {};

  const handleFiles: React.ChangeEventHandler<HTMLInputElement> = e => {
    let files = e.target.files;
    if (files && files.length > 0) {
      setUrl(URL.createObjectURL(files[0]));
    }
  };
  const srcStyle = { fill: '#fcba03', r: 12, font: '30px serif', fontFill: '#000' };
  const targStyle = { ...srcStyle, fill: '#be2de2' };

  return (
    <PageLayout>
      <div
        css={css`
          button {
            margin-top: 10px;
            background-color: ${lighten('0.2', colors.darkgrey)};
            outline: none;
          }
        `}
      >
        <label>
          Image url
          <input type="url" />
        </label>
        <button>load image</button>
        <label>
          Click here to upload an image.
          <input type="file" accept="image/*" onChange={handleFiles} />
        </label>
        <CanvasPoints
          points={srcPoints}
          clickHandler={srcPointHandler}
          image={image}
          style={srcStyle}
        />
        {srcPoints.length === 4 && (
          <CanvasPoints
            points={targetPoints}
            // setPoints={setTargetPoints}
            clickHandler={targetPointHandler}
            image={image}
            style={targStyle}
          />
        )}
        {targetPoints.length === 4 && (
          <button
            onClick={() => {
              // setShowWarped(true);
            }}
          >
            Generate warped
          </button>
        )}
        {targetPoints.length === 4 && image && (
          <CanvasWarped srcPoints={srcPoints} targPoints={targetPoints} image={image} style={targStyle} />
        )}
      </div>
    </PageLayout>
  );
};

export default PerspectiveWarp;
