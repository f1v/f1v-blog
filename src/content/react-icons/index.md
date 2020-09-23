---
title: 'The Easiest Way to Use Icons in React'
date: '2020-09-23'
author: 'Tim Rybicki'
---

The [react-icons](https://react-icons.github.io/react-icons/) project provides a developer-friendly way to use thousands of open source icons in any React project. The great thing is that it includes a collection of 20+ different icon sources, including Material Design, Font Awesome, and Bootstrap, all accessible in a single package.

## Install the Package

To get started, install the package:

```bash
# npm
npm install react-icons

# yarn
yarn add react-icons
```

## Find Your Desired Icon

Head on over to the react-icons [website](https://react-icons.github.io/react-icons/) to browse the icon collections. I would recommend searching for the icon you need, for example, "bell".

![](./bell-search-results.png)

If you notice that the icons have a prefix like "Fa", "Vsc", or a different 2-3 letter combination, that will tell you which collection this icon comes from.

## Importing the Icon

To import an icon, make sure you import from the correct source, as in the examples below. If you're importing an icon prefixed with "Fa", then you would import from "react-icons/fa".

```jsx
import { FaBell } from 'react-icons/fa'; // Font Awesome
import { AiFillBell } from 'react-icons/ai'; // Ant Design Icons
import { VscBell } from 'react-icons/vsc'; // VS Code Icons
```

## Using the Icon

Once imported, the icon can be rendered as a React component.

```jsx
<div>
  <FaBell />
</div>
```

## Styling a Single Icon

The props `color`, `size`, and `style` can be passed into the component.

```jsx
<div>
  <FaBell color="#3297a8" size="2em" style={{ margin: '5px' }} />
</div>
```

## Styling Multiple Icons

We can import `IconContext` from react-icons to apply styling to a number of icons.

```jsx
import { IconContext } from 'react-icons';

<div>
  <IconContext.Provider
    value={{
      color: '#3297a8',
      size: '3em',
      style: { padding: '2px' },
    }}
  >
    <FaBell />
    <AiFillBell />
    <VscBell />
  </IconContext.Provider>
</div>;
```

## Further Reading

- [react-icons Website](https://react-icons.github.io/icons?name=ai)
- [react-icons GitHub](https://github.com/react-icons/react-icons)
