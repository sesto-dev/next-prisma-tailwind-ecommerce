<a href="http://accretence.com">![create-next-dashboard](https://i.imgur.com/hNovO0U.png)</a>

<a href="https://npmjs.com/package/create-next-dashboard">
   <p align="center">
   <img src="https://img.shields.io/npm/v/create-next-dashboard?style=for-the-badge&labelColor=000000">
   <img src="https://img.shields.io/npm/dw/create-next-dashboard?color=000&style=for-the-badge">
   </p>
</a>

## Usage

1. Setup a local deployment using this command:

```bash
npx create-next-dashboard my-app
```

2. Create your `.env` file and provide these variables:

```shell
JWT_SECRET =
MONGO_ATLAS_URI =
MAIL_SMTP_HOST =
MAIL_SMTP_USER =
MAIL_SMTP_PASS =
MAIL_SMTP_PORT =
```

3. Fill in the `main.config.js` file with your preferred information.
4. Run `cd my-app` and `npm run dev`, the app should be running in `localhost:3000`!

## Sending Emails

You need to provide `SMTP` credentials obtained from your Email provider in the `env` file.

## Authentication

Authentication is implemented using `httpOnly` cookies served from serverless API functions.

## Database

You can spin up a MongoDB database instance using [MongoDB Atlas](http://cloud.mongodb.com/). Provide the `MOGNO_ATLAS_URI` in `.env`.

## Google Analytics

You only need to provide your `googleAnalyticsID` in `main.config.js` file to activate your Google Analytics.

## Built Upon

-   [geist-ui](https://github.com/geist-org/geist-ui) as UI library which adheres to the design language of [Vercel](https://vercel.com/)!
-   [react-dashboard-design](https://github.com/ofekashery/react-dashboard-design) as inspiration and much of the initial codebase!
-   [nextjs-client-auth-architectures](https://github.com/justincy/nextjs-client-auth-architectures) as the route protection architecture!

## Dependencies

```json
   "@geist-ui/core": "^2.3.8",
   "apadana": "^0.0.4",
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
