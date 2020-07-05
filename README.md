# F1V Blog

[![Netlify Status](https://api.netlify.com/api/v1/badges/5fda6eca-0c3f-4270-98ae-9fe2fcfc694c/deploy-status)](https://app.netlify.com/sites/f1v-blog/deploys)

## Technologies

- Gatsby, React, Styled Components
- Site created from this [gatsby starter](https://github.com/agneym/gatsby-blog-starter)
- Hosted on netlify which will build itself on pushes to master

## Local Development

To run the local dev server:

```shell
yarn
yarn start
```

### Other commands

- Clear gatsby's cache - periodically may have to run this to fix local dev abnormalities

```shell
yarn clean
```

## How to make new posts

Posts lives in the `content` folder. To make a new post, follow these steps:

- Make a new folder under the `content` folder. The name of the folder will become the slug in the URL.
- In that folder create an `index.md` file
- Make sure to include the frontmatter at the top of the file (title, date, author)
