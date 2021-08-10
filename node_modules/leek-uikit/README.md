# Leek UIkit

[![Version](https://img.shields.io/npm/v/@pancakeswap-libs/uikit)](https://github.com/cryptoleek-team/leek-uikit) [![Size](https://img.shields.io/bundlephobia/min/@pancakeswap-libs/uikit)](https://www.npmjs.com/package/leek-uikit)

Leek UIkit is a set of React components and hooks used to build pages on Leek Finance's apps. It also contains a theme file for dark and light mode.

## Install

`yarn add leek-uikit`

## Setup

### Theme

Before using Leek UIkit, you need to provide the theme file to styled-component.

```
import { ThemeProvider } from 'styled-components'
import { light, dark } from 'leek-uikit'
...
<ThemeProvider theme={isDark}>...</ThemeProvider>
```

### Reset

A reset CSS is available as a global styled component.

```
import { ResetCSS } from 'leek-uikit'
...
<ResetCSS />
```

### Types

This project is built with Typescript and export all the relevant types.

## How to use the UIkit

If you want to use components from the UIkit, check the [Storybook documentation](https://github.com/cryptoleek-team/leek-uikit)
