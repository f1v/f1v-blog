---
title: 'GIT and PR reviews'
date: '2021-06-17'
author: 'Alex Braun'
author_site: https://braunline.com/
---

For both new and experienced developers there are many valuable rules and tools to make use of, but today I'd like to focus on git PR/commit messages and overall PR review etiquette.

I've found that out of all pain points in front end development, these three are difficult for newer devs to fully grasp.

## GIT Common use cases

Git is a Version Control System (VCS). It allows you to track and organize changes to your files, and it makes working on projects with multiple people much easier.

While the usage of a VCS is meant to simplify, and no doubt it is an indespensible tool for any software development team, there are caveats that newer and/or self-taught devs often run into. The purpose of this post is to discuss and help resolve the most common issues we all run across from time to time.

Here's a list of the most common scenarios, tasks, and etiquette rules that devs must learn and be mindful of to successfully work with git in a team environment.

### Commit messaging

Taken from http://karma-runner.github.io/5.2/dev/git-commit-msg.html

Many projects and companies have thier own philosophy to follow, but the purpose of Karma's approach is to maximize the ability of devs to make descriptive yet consise commit messages.

The first line cannot be longer than 70 characters, the second line is always blank and other lines should be wrapped at 80 characters. The type and scope should always be lowercase as shown below.

Scope is typically the component, feature or area that is being updated.

Allowed `<type>` values:

- feat (new feature for the user, not a new feature for build script)
- fix (bug fix for the user, not a fix to a build script)
- docs (changes to the documentation)
- style (formatting, missing semi colons, etc; no production code change)
- refactor (refactoring production code, eg. renaming a variable)
- test (adding missing tests, refactoring tests; no production code change)
- chore (updating grunt tasks etc; no production code change)

Example

```sh
fix(middleware): ensure Range headers adhere more closely to RFC 2616

Add one new dependency, use `range-parser` (Express dependency) to compute
range. It is more well-tested in the wild.

Fixes #2310
```

### Rebasing vs Merging a main branch into your existing feature branch.

#### Merging

**In almost any scenario, don't do this :)**

I'll start off by explaining what happens when you merge code from any central branch into your feature branch.
When merging, a merge commit is created in the feature branch which adds the histories of both branches.

![](./Merging_main_into_feature.svg)
Image from https://www.atlassian.com/git/tutorials/merging-vs-rebasing

The addition of multiple merge commits can make your pull request hard to understand. In some situations merging will update refs on each commit, which ends up making it look like merged code from the main branch is a staged change in your PR. It isn't actually a change, but anyone reviewing your PR will have considerable trouble going through your changes. In this case, you need to rebase the main branch.

#### Rebasing

When rebasing, your feature branch begins on the tip of the main branch, effectively incorporating all of the new commits in main. But, instead of using a merge commit, rebasing re-writes the project history by creating brand new commits for each commit in the original branch.

Check here for an excellent set of instructions on how to rebase https://git-scm.com/book/en/v2/Git-Branching-Rebasing

![](./Rebasing_feature_branch_into_main.svg)
Image from https://www.atlassian.com/git/tutorials/merging-vs-rebasing

#### Merge conflicts when rebasing

Whether rebasing or merging, if merge conflicts come up, those should always be handled with careful attention to not break others code that you have overlapped with.

https://docs.github.com/en/github/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line

When resolving, in VSCode you will see something like this:
![](./rebase-merge-conflict.png)

Note that when rebasing, your initial logical thinking that Current is your branch while Incoming is Master is actually backwards --Your code is considered incoming because you're rebasing atop the main branch.

### Squashing commits via interactive Rebasing

Interactive rebasing is a great way to clean up your feature branch commits for both new devs and experienced as well. Interactive rebasing allows you to squash newer commits into successively older ones.

In the following example, the main goals of adding the component and adding feature tests were committed, but along with that were some small changes that might, in more extreme cases, cause your pull request to become polluted with excessive commits.

In this case, we only want to show a commit for the component, and a commit for the test

```sh
git rebase -i HEAD~4
```

```sh
pick 07c5abd feat(LoginButton): Add click event handler
pick de9b1eb refactor(LoginButton): Remove incorrect target element
pick fa20af3 test(LoginButton): Add feature tests
pick 3e7ee36 style(LoginButton): Add missing semi-colon

# Rebase 8db7e8b..fa20af3 onto 8db7e8b
#
# Commands:
#  p, pick = use commit
#  r, reword = use commit, but edit the commit message
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#  f, fixup = like "squash", but discard this commit's log message
#  x, exec = run command (the rest of the line) using shell
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

When this screen opens, you want to change pick to squash for any commits you want squashed into the previous commit

```sh
pick 07c5abd feat(LoginButton): Add click event handler
squash de9b1eb refactor(LoginButton): Remove incorrect target element
pick fa20af3 test(LoginButton): Add feature tests
squash 3e7ee36 style(LoginButton): Add missing semi-colon
```

Once this is done, your terminal / code editor will have a separate popup for each commit, where you can choose to remove the message "refactor(LoginButton): Remove incorrect target element" and "style(LoginButton): Add missing semi-colon", respectively.

Once done, `git log` will show

```sh

commit fa20af3 (HEAD -> mybranch)
Author: me <me@f1v.co>
Date:   Tue Jun 15 11:51:07 2021 -0400

    test(LoginButton): Add feature tests

commit 07c5abd
Author: me <me@f1v.co>
Date:   Tue Jun 15 10:54:05 2021 -0400

    feat(LoginButton): Add click event handler

commit 0dd387b (master)
Author: someoneelse <someoneelse@f1v.co>
Date:   Tue Jun 15 10:54:05 2021 -0400

    feat(AnotherComponent): Add handling of API requests

...
```

### PR titles

Different organizations follow differnt approaches. Here at F1V, we follow Karma's appraoch
![](./F1V_PR_titles.png)

For PR titles, you should mindfully follow the typical approach that you see regarding PR titles.

For example, in another organization, you may see the ticket number at the beginning of each branch commit, along with a description. In this case, prefixing your PR title with the ticket number is the standard that you, as a contractor tasked with working in that team's environment, should probably follow:

```sh
EE-22248 - update selector to handle unassigned case (#9112)

EE-22248 - remove duplicate field (#9116)

EE-22960 - Admin Diag Results - Fixed Comparison Bar not showing up in Placement By Domain drawer if no Level 1 (Green Stripe) Students (#9113)
```
