import React from 'react'
import styled from '@emotion/styled'

// this strategy is from: https://davidwalsh.name/css-gradient-text

// gradient from elemental starter. 
// color primary: "rgb(104, 136, 223)"
const cp = '#6888df'
// color secondary: "rgb(245, 85, 85)"
const cs = '#f55555'

const HeadingText = styled.h1`
  background: linear-gradient(0.25turn, ${cp}, ${cs});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export default HeadingText
