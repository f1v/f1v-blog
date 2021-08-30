---
title: 'Using React 360'
date: '2021-07-29'
author: 'Nick Marini'
author_site: https://github.com/nmarini
repo: https://github.com/nmarini/react-360
---

The [react-360](https://github.com/facebookarchive/react-360) framework is for creating interactive 360 experiences that run in your web browser. It pairs modern APIs like WebGL and WebVR with the declarative power of React. React 360 builds off of React Native in its component sturcture and three.js for rendering 3D graphics in the browser.

## Why React 360?

React 360 is a great way for developers new to VR to get an introductory experience. If you have experience with React and React Native then this can be a very effective entry point into VR. React 360 is an great way to introduce some basic concepts to developers new to VR. But, for a more in-depth understanding of VR, a more advanced and robust library would be more useful.

## Install

Before install, you'll need:

- Node.js version 6.0.0 of higher
- `yarn` or `npm` (>=v3.0.0) package manager

Next, install the React 360 CLI – a command-line tool that generates the basic layout of new projects.

```bash
npm i -g react-360-cli
```

Or

```bash
yarn global add react-360-cli
```

Once installed, the CLI can be used to generate a new project:

```bash
react-360 init PROJECT_NAME
```

PROJECT_NAME represents the name of your new application.

Then you can change directories into your new project and start the application by running `npm start` or `yarn start`.
When the server has booted you can access your application at `http://localhost:8081/index.html` and you can add `?hotreload` at the end of that url to allow certain changes to the application to automatically update the application without reloading the page.

## Important files/folders:

- `index.js` - Where the main code of you application exists, and contains imports that will determine what your application displays.
- `client.js` - This file is the Runtime that connects your browser to the React application. The code in this file will create a new React 360 instance, load your React code and attach it to a specific place in the DOM.
- `index.html` - The webpage that you will be loading. This will point to the JavaScript code to mount your application.
- `static_assets` - This folder is used to store your application's resources, including images, audio files, 3D objects, and more.

## Usage:

React 360 gives you access to a number of familiar components (if you have React Native experience) and some new components and methods to help develop a 3D environment on the web.

- `AppRegistry` - Allows us to connect components from the `index.js` file to the `client.js` file in order to display your code. React separated the runtime in order to make the code run quicker and more efficiently as it already takes lots of CPU.
- `asset` - In order to reference any resource in your `static_assets` folder you need to use this method.
- `View` - Allows developers to create a 2D surface and also functions as a `div` container.
- `Text` - Allows text to be added into 3D space, and is typically nested inside of a `View` component.
- `Animated` - Makes it possible to toggle the size, position, and appearance of elements in your scene in a declarative style that fits into React.
- `Entity` - Allows you to display 3D objects in your environment.
  -- _Note on Entity_-- React 360 does have an `Entity` component but it does not actually work, so most documentation states that you should actually import `Entity` from Entity instead of React 360.
- `VrButton` - Since the environment is represented differently compared to your typical webpage you are not able to interact with the elements on the site like you typically would. React-360 provides the `VrButton` component that is a utility class that detects click-type actions across a variety of input devices.
- `NativeModules` - provide the ability for React code to call back into your runtime, and provide functionality that's only available in the main browser environment. Examples include storing values between loads, requesting information about connected controllers, or manipulating the rendered environment.

# Example:

Utilizing `asset`, `Text`. `View`, and `Entity`

```jsx
import { asset, Text, View } from 'react-360';
import Entity from 'Entity';
```

```jsx
<View>
  <Text>Text Here!!</Text>

  <Entity
    source={{
      obj: asset('<File Name>.obj'),
      mtl: asset('<File Name>.mtl'),
    }}
  />
</View>
```

This will display a 3D object in your web application with text attached near the object. The placement of the text and 3D object can all be manipulated through styling the component.

## Quick Note on Documentation:

React 360 has documentation listed [here](https://github.com/facebookarchive/react-360) for getting the application running and [here](https://github.com/facebookarchive/react-360/tree/master/docs) explaining how to use each component or feature. Every single blog or tutorial that explains how to use React 360 points to a location that no longer exists. My guess is that there was some extensive documentation that used to exist with Facebook, but they were either removed or all of the links are out of date.
