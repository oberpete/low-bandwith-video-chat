# low-bandwith-video-chat
Prototype developed in the course 'Building Interaction Interfaces' at TU Wien to study an alternative form of a video chat. 

Low-bandwith-video-chat takes a webcam input and determines the user's position to show a fitting emoji that is then sent to other participants as a representation. This provides three main benefits: preservation of some privacy, very low bandwith requirements and the option to get an overview over large amounts of users without needing to watch multiple video streams.

Recognised states are:
- Present 🧑
- Absent ☕️
- Hand raised 🙋
- Thumbs up 👍
- Heart ❤️

The webapp includes an onboarding process that allows the selection of a nickname and personalized emoji representations. The chat displayed in the app is still a mockup and not functional. 

## Technology
- machine learning model created with [Google's Teachable Machine](https://teachablemachine.withgoogle.com)
- [Google Firebase](https://firebase.google.com) realtime database to save the user states
- vue.js web app

## Live Demo
![demo](docs/demo/lowBandwVideoChat_prototype.gif)
See [https://oberpete.github.io/low-bandwith-video-chat/](https://oberpete.github.io/low-bandwith-video-chat/)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
