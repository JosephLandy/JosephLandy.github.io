---
title: Perspective Warp
image: persp_screenshot.png
github: https://github.com/JosephLandy/josephlandy.github.io/blob/source/src/pages/perspectivewarp.tsx
website: https://josephlandy.github.io/perspectivewarp/
layout: post
tags: [JS, React, Frontend, Web]
date: '1927-12-12T10:00:00.001Z'
featured: true
---

[Try it out for yourself!](https://josephlandy.github.io/perspectivewarp)

I encountered a function while learning openCV to remove perspective distortion from a feature viewed at an angle in an image and decided to try implementing it myself in JavaScript. It was a quick project that helped me explore different math libraries in JavaScript, and keep my linear algebra skills sharp.

The somewhat extreme, but also surprisingly consistent perspectives applied to photos of buildings in particular are quite interesting and fun to play around with. The output reminds me somewhat of Dalí and surrealism. 

One final step I haven’t implemented yet is to use interpolation in calculating the final pixels, which should improve the image quality somewhat. 