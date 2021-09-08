---
title: 'As a React.js developer, what is React Native like?'
date: '2021-08-29'
author: 'Tim Rybicki'
author_site: https://timr.dev/
---

If you are a React developer you may have considered using React Native, one of the most popular frameworks for creating cross-platform mobile apps. Let's look at how the developer experience for React Native compares to React.js.

## Some key differences

<u>No more divs - everything is a View component</u> - Because we are no longer in the web browser, we can't assume all HTML is valid, including the `div` element. Instead you can think of the `<View />`, imported from `react-native`, component as its equivalent.

<u>Everything uses flexbox by default</u> - Yes, everything has `display:flex` and there is no grid! And if you try to use `display: inline` or `display: block` you'll get an error. The only other valid display option in React Native besides flex is `none`. Also the default for `flex-direction` is `column` while in browsers it is `row`.

<u>Instead of pixels, use numbers or percentages</u> - Instead of giving that text a font-size of `12px` you would use a number, like `12` or a percentage, like `8%`.

<u>onClick is called onPress</u> - When adding an `onClick` to a button you would get an error! In React Native the prop is called `onPress`.

<u>No more inspect element tool</u> - Because we don't have all the fancy devtools of the browser, debugging can be harder, especially without the inspect element tool to debug styling. However, there are still many debugging options that cover most areas.

<u>Web component libraries won't work</u> - Your favorite component library in the web will not work in React Native, since the web uses HTML that won't work in React Native. The component library I landed on is React Native Elements but there are mulitple options.

## Some things are the same

<u>react-router-native exists</u> - If you want to continue to use a routing framework similar to React.js, you'll be happy to know `react-router` has a native version that works the same way.

<u>You can also use styled-components</u> - If you're used to using styled-components you can use it in the same way. However, using React Native's StyleSheet, the standard way to add styling in React Native, might be easier in many cases.

## Conclusion

At the end of the day you are still going to be writing "React" code with props, state, hooks, and JSX. To me it feels about 95% the same as writing normal React code where the main differences are related to styling.

## Further Reading

- [Expo docs](https://docs.expo.dev/)
- [StyleSheet in React Native](https://reactnative.dev/docs/stylesheet)
