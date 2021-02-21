---
title: 'Using Recoil for State Management'
date: '2021-02-18'
author: 'Tim Rybicki'
author_site: https://timr.dev/
---

Recoil is a package made by Facebook which helps manage state in a React app. It is minimal and effective for smaller to medium projects.

## Why to use Recoil

- The setup process is very quick
- Compared to some other libraries, recoil is easier to use and understand
- One line of code in your component gets you access to a getter and a setter for your state (as opposed to needing `mapStateToProps` and `mapDispatchToProps`)

## How to Install

To add the package to your React application, run `npm install recoil` or `yarn add recoil`.

Similar to redux, we need to wrap our entire application with a provider, called `RecoilRoot` here. Fortunately we don't need to pass a `store` to it which is definitely a time saver.

```jsx
function App() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}
```

Note: we are wrapping our `App` component here, but you could also add `RecoilRoot` in your `index.jsx` file.

## Creating Some State

The next step is creating the initial state for the state you want to save. Here is an example of what that might look like:

```jsx
import { atom } from 'recoil';

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
});
```

An `atom` in recoil is a piece of state which we can import and update in other files. The `key` is an identifier for the state and `default` is the value of the state when the app starts. All expected data types are supported (strings, arrays, objects, etc).

I suggest creating a file called `src/recoils/atoms.js` where you can keep your atoms. You can also create separate atom files if your app is bigger.

## Using the State

To access the state in a functional component, `useRecoilState` works a lot like React's `useState`:

```jsx
import { useRecoilState } from 'recoil';
import { isLoggedInState } from 'recoil/atoms';

const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
```

We import our atom we created before and pass it to `useRecoilState` and just like that we have access to a getter and setter for that state.

The fact that we get access to the current state (mapStateToProps in redux) and the ability to update the state (mapDispatchToProps in redux) in just one line is what makes this recoil so fast and effective.

## Using Selectors

Selectors take things a step further in cases where you want to return some derived value. For example we can use an atom called `textState`, get the current value, and then do some logic to return the length of that value.

```jsx
import { textState } from 'recoil/atoms';

const textCountState = selector({
  key: 'textCountState',
  get: ({ get }) => {
    const text = get(textState);
    return text.length;
  },
});
```

To use this selector in a component, we can call it like this:

```jsx
import { useRecoilValue } from 'recoil';
import { textCountState } from 'recoil/selectors';

const textCount = useRecoilValue(textCountState);
```

## Conclusion

Recoil is great because with just a few lines of code, you can add state management your React app. If you have a small to medium size application using functional components, then it is a great choice.

## Further Reading

- [recoil Website](https://recoiljs.org/)
- [recoil GitHub](https://github.com/facebookexperimental/Recoil)
