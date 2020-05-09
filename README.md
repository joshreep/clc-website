# CLC Website

This repository contains the source code for the [Covenant Life Church Website](https://www.covenant.life)

## Getting started

1. Clone the repo
2. This repo uses [Yarn](https://yarnpkg.com/) instead of [npm](https://www.npmjs.com/), but we still have access to all npm packages, so [install](https://classic.yarnpkg.com/en/docs/install#mac-stable) yarn globally if you haven't already (I recommend the install script: `curl -o- -L https://yarnpkg.com/install.sh | bash`) and run `yarn` to install the dependencies.
3. To start up the dev server run `yarn dev` and navigate to [localhost:3000](http://localhost:3000)
4. Enjoy coding!

## Setting up Prettier

We use [Prettier](https://prettier.io/) to handle all of our code formatting. In order to set it up with vscode, you'll need to install the [Prettier - Code formatter](https://github.com/prettier/prettier-vscode) extension. This will automatically format the document on save. Prettier should already be set up as your default formatter by default.

## Typescript

I chose to use [Typescript](https://typescriptlang.org) for the static type checking. The other options would include [Flow](https://flow.org/) or [JSDoc](https://jsdoc.app/). I don't like anything about Flow. It's clunky. It has to compile. The syntax isn't the greatest. I like that JSDoc only uses comments to annotate, so it doesn't need to compile making it infinitely faster than anything that does need to compile. However, it does seem limited on features, and the syntax is clunky.

Typescript does need to compile which is a double edged sword in this case. It is able to stop the build if the compiler catches a type error which JSDoc cannot do. However compiling does add time to the build. The syntax is really intuitive also, which I like. Last but not least, typescript has the best community support that I can find. And that matters to me. The good news is, we can still use JSDoc in tandem if we wish. No harm in that.

## Next.js

We use [Next.js](https://nextjs.org/learn/basics/getting-started) to handle server side rendering as well as our api.

## Testing

We use [Jest](https://jestjs.io/) as our test runner. The rule is, if there's no test, it's broken. In order to insure that all code is covered, we put tests in the same directory as the code. For example, if you have a component named `FooBar.tsx`, in the same directory, you should have a `FooBar.test.tsx`. This way you don't have to hunt down the tests in another directory, and it's easy to see that a file does have a test as it should. Try and cover as many of the branches as you can. I'd rather too much coverage than skip something important.
