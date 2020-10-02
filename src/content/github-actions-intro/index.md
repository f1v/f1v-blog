---
title: 'Publishing to npm Using GitHub Actions'
date: '2020-06-26'
author: 'Tim Rybicki'
author_site: https://timr.dev/
---

GitHub Actions present a great way to automate tasks. In this case, we are setting up a way to update a React component library, [zati](https://github.com/f1v/zati), on the npm registry. The end resulting behavior is the following:

- We create a new release on GitHub
- Our workflow is triggered
- A new commit with the release number is created
- The package is published to npm

## The Workflow File

Workflow files are `.yml` files that live in the `.github/workflows` folder. This is the complete workflow file which we will inspect step-by-step.

```yml
name: Publish to npm

on:
  release:
    types: [published]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 12
          registry-url: https://registry.npmjs.org/
      - run: yarn install
      - run: yarn build

      - name: Get version number from release
        run: echo ::set-output name=version::${GITHUB_REF/refs\/tags\//}
        id: tag

      - name: Create commit with version number
        run: |
          git config user.name $GITHUB_ACTOR
          git config user.email gh-actions-${GITHUB_ACTOR}@github.com
          npm version ${RELEASE_VERSION}
        env:
          RELEASE_VERSION: ${{ steps.tag.outputs.version }}

      - name: Run publish command
        run: yarn publish --new-version ${RELEASE_VERSION}
        env:
          RELEASE_VERSION: ${{ steps.tag.outputs.version }}
          NODE_AUTH_TOKEN: ${{ secrets.NPM_AUTH_TOKEN }}

      - name: Push version commit to GitHub
        run: |
          git remote add gh-origin https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git
          git push gh-origin HEAD:master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## The Trigger

This tells GitHub we want to run this action when a release is published. Note there are many triggers you can substitute, such as push events to master. Reference more triggers [here](https://help.github.com/en/actions/reference/events-that-trigger-workflows).

```yml
on:
  release:
    types: [published]
```

## Setup Environment

The first block of steps gets access to our repository files, sets up a node environment, and builds our project. The `yarn build` step can be subsituted with your eqvuialent command to prepare your package.

```yml
- uses: actions/checkout@v1
- uses: actions/setup-node@v1
  with:
    node-version: 12
    registry-url: https://registry.npmjs.org/
- run: yarn install
- run: yarn build
```

## Get Version Number

When we create a release on GitHub we enter a version number and we want to re-use that number to match the version number with our npm package. To get this number we use the following command with the `set-output` flag which lets us reference this in other steps as an environment variable.

```yml
- name: Get version number from release
  run: echo ::set-output name=version::${GITHUB_REF/refs\/tags\//}
  id: tag
```

## Create Commit

This step allows us to make a commit in our repository, with the `npm version` command updating our `package.json` version and creating a commit with the version number. The `$GITHUB_ACTOR` variable comes for free. We are also using the version number we saved as a variable above.

```yml
- name: Create commit with version number
  run: |
    git config user.name $GITHUB_ACTOR
    git config user.email gh-actions-${GITHUB_ACTOR}@github.com
    npm version ${RELEASE_VERSION}
  env:
    RELEASE_VERSION: ${{ steps.tag.outputs.version }}
```

## Configure npm Secret

We need to create a secret in our GitHub repository using a token generated from npm. This will authenticate us with npm when we reference the token in the next step. To get a token from npm, follow these steps:

- Login to [npmjs.com](https://www.npmjs.com/)
- Click your profile icon and choose "Auth Tokens"
- Click "Create New Token"

Next, we add this to our repository's secrets:

- In your GitHub repository, click "Settings"
- Go to the "Secrets" section and click "New Secret"
- Enter `NODE_AUTH_TOKEN` as the key
- Use the generated token from npm as the value

## Publish to npm

This command will push our updated code to the npm registry. Using the `--new-version` flag lets us specify the exact version number to set. We are using the `RELEASE_VERSION` variable similar to above, as well as the `NODE_AUTH_TOKEN` secret we set up in the previous step.

```yml
- name: Run publish command
  run: yarn publish --new-version ${RELEASE_VERSION}
  env:
    RELEASE_VERSION: ${{ steps.tag.outputs.version }}
    NODE_AUTH_TOKEN: ${{ secrets.NPM_AUTH_TOKEN }}
```

## Push Commit to GitHub

We made a new commit with the version number in a previous step, but we still need to push that update to our repository. Doing this as a last step makes sure this step will only run if the publishing to npm succeeds. The secret `GITHUB_TOKEN`, as well as all three variables in the git url are built-in.

```yml
- name: Push version commit to GitHub
  run: |
    git remote add gh-origin https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git
    git push gh-origin HEAD:master
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Further Reading

Another option to consider for automating releases, is [semantic-release](https://github.com/semantic-release/semantic-release#how-does-it-work). This is even more convenient because it generates release numbers and changelogs automatically. For a walkthrough of setting this up with GitHub Actions, take a look at [this guide](https://github.com/zeke/semantic-release-with-github-actions).
