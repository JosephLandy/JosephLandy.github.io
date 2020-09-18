---
title: Sleep Tracking Web App
github: https://github.com/JosephLandy/sleep-frontend
website: https://sleep-tracker-josephlandy-crazybuild.azurewebsites.net/
author: [Joseph]
layout: post
tags: []
date: '1927-12-12T10:00:00.001Z'
---
Sleep Tracker Web App
===
I built this application to record data about my sleep and track how different factors would affect it, when I didn't find an existing option I was satisfied with. I've struggled a lot with sleep issues since adolescence, and I've found that data collection is critical for evaluating the effectiveness of the various practices I use to manage it. 

It was important to me to define the variables I was interested in tracking myself, rather than trying to fit myself into someone elses form. I also wanted to analyze the data myself.

The front end was written in Typescript using React and the Material-UI library, while the backend was also developed with Typescript and stores collected data in MongoDB. I considered using an SQL database, but ultimately decided that MongoDB had a lot of advantages, principally it's commonalities with JavaScript.

My focus with this application was my own use, so I was able to simplify the design somewhat by not accommodating other users at all (sorry!).

I had no real intention of hosting the project anywhere but locally for my own use, but for demonstration purposes I'm running a copy on Microsoft Azure, which you can find [here](https://sleep-tracker-josephlandy-crazybuild.azurewebsites.net/).

In the course of this project, I learned a lot about some of the tooling available for developing web apps. In particular, I found [Storybook](https://storybook.js.org/), an environment for developing the individual components of a UI in isolation to be completely invaluable as the application got past a certain level of complexity.