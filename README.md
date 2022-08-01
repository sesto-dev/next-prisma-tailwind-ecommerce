<a href="http://accretence.com">![next-dashboard](https://i.imgur.com/hNovO0U.png)</a>

<a href="https://npmjs.com/package/create-next-dashboard">
   <p align="center">
   <img src="https://img.shields.io/npm/v/create-next-dashboard?style=for-the-badge&labelColor=000000">
   <img src="https://img.shields.io/npm/dw/create-next-dashboard?color=000&style=for-the-badge">
   </p>
</a>

## Live Demo

You can find a live demo at [accretence.com](https://accretence.com)!

## Usage

```bash
npx create-next-dashboard my-app
```

1. Create your `.env` file and provide `JWT_SECRET` & `MOGNO_ATLAS_URI` keys.
2. Run `cd my-app` and `npm run dev`, the app should be running in `localhost:3000`!

You should visit the [`<Layout />`](https://github.com/Accretence/next-dashboard/blob/main/src/Layout.js) component to see the props it accepts.

```js
import Layout from '../components/Layout'

export default function Index() {
    return <Layout>/* Your content */</Layout>
}
```

3. Fill in the `main.config.js` file with your information according to the props.

## Google Analytics

You only need to provide your `googleAnalyticsID` in `main.config.js` file to activate your Google Analytics.

## About

Running the `npx` script above should create a Next.js dashboard built using:

-   [create-next-dashboard](https://github.com/accretence/create-next-dashboard) the `npx` script!
-   [geist-ui](https://github.com/geist-org/geist-ui) which adheres to the design language of [Vercel](https://vercel.com/)!
-   [react-dashboard-design](https://github.com/ofekashery/react-dashboard-design) as inspiration and much of the initial codebase!

## Dependencies

```json
   "@geist-ui/core": "^2.3.8",
   "axios": "^0.27.2",
   "bcryptjs": "^2.4.3",
   "cookie": "^0.5.0",
   "jose": "^4.8.3",
   "mongoose": "^6.5.0",
   "next": "^12.2.3",
   "nodemailer": "^6.7.7",
   "react": "^18.2.0",
   "react-usestateref": "^1.0.8"
```
