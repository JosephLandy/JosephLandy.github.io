import React, { useEffect, useState } from 'react';
import { css, keyframes, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import { BsChevronCompactDown } from 'react-icons/bs';

import { useWindowSize } from '../utils';
import MonsterImage from './MonsterImage';
import { useLocalStorage } from 'usehooks-ts';
/*
Ok, so the image width at max is 1000px, height is 562.5px
when not max, the width of both Wrapper and the image = the container width.
height of image is (1080/1920) * width
Height of down button is always 112 by 112.
*/

interface Props {}

const ratio = 1080 / 1920;
// transition in keyframe actually starts a little too far down. I think I'm not accounting for the size of the
// button. It also jerks a little bit.
function transitionKeyframes(width: number) {
  let w = width;
  if (width >= 1000) {
    w = 1000;
  }
  return keyframes`
    0% {
      transform: translateY(${ratio * w}px);
    }
    100% {
      // this needs to be relative to size of window as well, using the ratio of
      // the desired translating at with=1000. If it's 100px at 1000,
      // it should be 70px at 700. bob keyframes found with the same ratio.
      transform: translateY(${0.1 * w}px);
    }
  `;
}

function bobKeyframes(width: number) {
  // first, clamp width at less than or equal to 1000.
  let w = width;
  if (width >= 1000) {
    w = 1000;
  }
  return keyframes`
    0% {
      transform: translateY(${0.1 * w}px);
    }
    25% {
      transform: translateY(${0.15 * w}px);
    }
    50% {
      transform: translateY(${0.1 * w}px);
    }
    75% {
      transform: translateY(${0.05 * w}px);
    }
    100% {
      transform: translateY(${0.1 * w}px);
    }
  `;
}

// holds the monster image and the control to get rid of it.
const MonsterWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  z-index: 1000000;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DownButton: React.FC<{ isHidden: boolean; onClick: any }> = ({ isHidden, onClick }) => {
  let theta;
  if (isHidden) {
    theta = 180;
  } else {
    theta = 0;
  }

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

const transitionInDelay = 4;
const transitionInDuration = 8;
const bobDuration = 5;

const MonsterFooter: React.FC<Props> = () => {
  const [enabled, setEnabled] = useLocalStorage('monsterEnabled', true);

  const [hidden, setHidden] = useState(true);
  const size = useWindowSize();

  // if the animation is still hidden a certain time after page load,
  // automatically unhide and play it.
  useEffect(() => {
    setTimeout(() => {
      if (hidden && enabled) {
        setHidden(false);
      }
    }, transitionInDelay * 1000);
  }, []);

  // construct the css with keyframes as a function of window width.
  let animationcss: SerializedStyles | undefined;

  if (size.height && size.width) {
    // console.log(`width: ${size.width} height: ${size.height}`);

    const transitionkeys = transitionKeyframes(size.width);
    const bobkeys = bobKeyframes(size.width);

    animationcss = css`
      animation-name: ${bobkeys}, ${transitionkeys};
      animation-duration: ${bobDuration}s, ${transitionInDuration}s;
      animation-timing-function: linear;
      animation-iteration-count: infinite, 1;
      /* animation-delay: ${transitionInDelay + transitionInDuration}s, ${transitionInDelay}s; */
      // animation delay is now handled in js
      animation-delay: ${transitionInDuration}s, 0s;
    `;
  }

  return (
    <MonsterWrapper
      css={
        (hidden || !enabled) || !animationcss
          ? css`
              img {
                display: none;
              }
            `
          : animationcss
      }
    >
      <DownButton
        isHidden={hidden}
        onClick={() => {
          setHidden(!hidden);
          setEnabled(!enabled);
        }}
      />
      <MonsterImage />
    </MonsterWrapper>
  );
};

export default MonsterFooter;
