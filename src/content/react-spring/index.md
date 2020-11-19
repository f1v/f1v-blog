---
title: 'Introduction to React-Spring Hooks'
date: '2020-11-19'
author: 'Nick Marini'
author_site: https://github.com/nmarini
---

The [react-spring](https://www.react-spring.io/) animation library is a spring-physics based animation library. It gives you an array of tools to easily and elegantly create animations.

This post is going to specifically focus on the react-spring’s Hook api.

This library presents a more modern approach to animations - it’s physics based instead of relying on css transitions. So animation effects are more in line with real world physics.

## Why React Springs

react-spring is easy to use and takes a lot less code to create the desired animations. Using react-spring is also a very easy transition given React already utilizes hooks. The react-spring hooks are also very intuitive, allowing a developer to right less code but still achieve a very natural and elegant animation.

- React spring has a Common api that allows you to precisely control the physics of your animation by creating a config object.
  - Optional properties include:
    - - Mass - spring mass
    - - Tension - spring energetic load
    - - Friction - spring resistance
    - - Clamp - when true, stops the spring once it overshoots its boundaries
    - - Easing - controls the motion/speed of animation
    - - Duration

## Install the Package

```bash
# npm install react-spring
```

react-spring is cross platform, it supports the web, react-native, react-native-web and most other platforms.

## Usage

There are five basic hooks in react-spring:

- `useSpring` - a single spring, moves data from one point to another.
- `useSprings` - multiple springs, for lists, where each spring moves data from one point to another.
- `useTrails` -multiple springs with a single dataset, one spring follows or trails behind the other.
- `useTransition` - for mount/unmount transitions (I.e. lists where items are added/removed/updated)
- `useChain` - to queue or chain multiple animations together.

### Import

You will need to import the react-spring hook along with a special factory called `animated`. This library animates outside of React for performance reasons.

```jsx
import { useSpring, animated } from 'react-spring';
```

### Next

You will define your `spring`

```jsx
const props = useSpring({ opacity: 1, from: { opacity: 0 } });
```

A spring animates values from one state to another. The props received from springs are not static values and are self-updating, therefore, cannot be used in regular divs and the like.

### Finally

Tie the animated values to your view

```jsx
return <animated.div style={props}>I will fade in</animated.div>;
```

Make sure to extend the native elemnt you would like to animate using `animated`. `animated` contains all of the valid html elements if your target is the web, but if youre target is a component or elements on other platforms do this:

```jsx
// React components
const AnimatedDonut = animated(Donut);

// React-native
const AnimatedView = animated(View);

// styled-components, emotion, etc.
const AnimatedHeader = styled(animated.h1)`
  ...;
`;
```

## Further Reading

Learn more about other features that react-spring offers:

- [Render-props api](https://www.react-spring.io/docs/props/spring) - Learn about their Render-prop features instead as an alternative to the [Hooks api](https://www.react-spring.io/docs/hooks/basics)
- [Common api](https://www.react-spring.io/docs/hooks/api) - Learn about different preset configurations and properties exist in react-spring.
