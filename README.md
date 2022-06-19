<p align="center" height="370">
<img align="center" height="370" src="https://user-images.githubusercontent.com/11304944/91128466-dfc96c00-e6da-11ea-8b03-a96e6b98667d.png">
</p>

Standardized set of [geist-ui](https://github.com/geist-org/geist-ui) components, heavily influenced by the amazing [react-dashboard-design](https://github.com/ofekashery/react-dashboard-design) project.

## Install

Add this repository as a [git submodule](https://github.blog/2016-02-01-working-with-submodules/) in your root:

```bash
git submodule add https://github.com/accretence/geist-components geist-components
```

## Usage

This is an EXTREMELY opinionated layout library built on top of [geist-ui](https://github.com/geist-org/geist-ui) adhering to the design language of [Vercel]() and should only be used if you want to adhere to this design language yourself. You should visit the `Layout` component to see the props it requires.

```js
import { Layout } from '../geist-components'

const Index = () => {
    return <Layout>// Your content</Layout>
}

export default Index
```

## Peer Dependencies

This package relies on these depencencies to be installed in the root repository:

```json
   "@geist-ui/core": "^2.3.8",
   "next": "^12.1.6",
   "react": "^18.1.0"
```
