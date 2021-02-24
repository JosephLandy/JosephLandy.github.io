import React, { useState, useEffect } from 'react';
import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import forward from '../look_forward.png';
import left from '../look_left.png';
import right from '../look_right.png';
import { BsChevronCompactDown } from 'react-icons/bs';
import { mq } from '../styles/constants';

interface Props {}


const baselinePosition = 100;

const bob = keyframes`
  0% {
    bottom: -10vh;
  }
  25% {
    bottom: -15vh;
  }
  50% {
    bottom: -10vh;
  }
  75% {
    bottom: -5vh;
  }
  100% {
    bottom -10vh;
  }
`;
const transitionIn = keyframes`
  0% {
    bottom: -100vh;
  }
  100% {
    bottom: -10vh;
  }
`;

// holds the monster image and the control to get rid of it.
const MonsterWrapper = styled.div`
  position: fixed;
  z-index: 1000000;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const images = [forward, left, forward, right];

const DownButton: React.FC<{ isHidden: boolean; onClick: any }> = ({ isHidden, onClick }) => {
  let theta;
  if (isHidden) theta = 180;
  else theta = 0;
  return (
    <BsChevronCompactDown
      css={css`
        font-size: 7em;
        &:hover {
          color: lightgreen;
        }
        &:active {
          color: green;
        }
        transform: rotate(${theta}deg);
      `}
      onClick={onClick}
    />
  );
};

const transitionInDelay = 7;
const transitionInDuration = 15;
const bobDuration = 5;

const animationCSS = css`
  bottom: -100vh;
  animation-name: ${bob}, ${transitionIn};
  animation-duration: ${bobDuration}s, ${transitionInDuration}s;
  animation-timing-function: linear;
  animation-iteration-count: infinite, 1;
  animation-delay: ${transitionInDelay + transitionInDuration}s, ${transitionInDelay}s;
`;

const MonsterFooter: React.FC<Props> = props => {
  const [srcindex, setSrcIndex] = useState(1);
  const [hidden, setHidden] = useState(false);

  // flip through eye positions.
  useEffect(() => {
    let interval = setInterval(() => {
      // console.log("interval fired");
      setSrcIndex(srcindex => (srcindex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MonsterWrapper
      css={
        hidden
          ? css`
              bottom: 0vh;
            `
          : animationCSS
      }
    >
      <DownButton
        isHidden={hidden}
        onClick={() => {
          setHidden(!hidden);
        }}
      />
      <img
        src={images[srcindex]}
        alt="Monster"
        css={css`
          /* opacity: 90%; // for some reason, opacity was reduced on images in IndexLayout */
          width: 100%;
          /* max-width: 1980px; */
          max-width: 1000px;
          display: ${hidden ? 'none' : 'initial'};
        `}
      />
    </MonsterWrapper>
  );
};

export default MonsterFooter;
