![geist-abstraction](https://i.imgur.com/hNovO0U.png)

This is an EXTREMELY opinionated layout library built on top of [geist-ui](https://github.com/geist-org/geist-ui), adhering to the design language of [Vercel](https://vercel.com/); and heavily influenced by the amazing [react-dashboard-design](https://github.com/ofekashery/react-dashboard-design) project. You should only use this library if you want to adhere to this design language yourself.

## Install

Add this repository as a [git submodule](https://github.blog/2016-02-01-working-with-submodules/) in your root:

```bash
git submodule add https://github.com/accretence/geist-abstraction geist-abstraction
```

## Usage

You should visit the [`<Layout />`](https://github.com/Accretence/geist-abstraction/blob/main/src/Layout.js) component to see the props it accepts.

```js
import { Layout } from '../geist-abstraction'

const Index = () => {
    return <Layout>/* Your content */</Layout>
}

export default Index
```

## Peer Dependencies

This package relies on these depencencies to be installed in your root repository:

```json
   "@geist-ui/core": "^2.3.8",
   "next": "^12.1.6",
   "react": "^18.1.0"
```
