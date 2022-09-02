<a href="https://create-next-dashboard.vercel.app">![Screenshot](https://user-images.githubusercontent.com/45223699/188122133-dc8260ca-f87c-4681-9996-3a26963fe1e2.png)
</a>

<a href="https://npmjs.com/package/create-next-dashboard">
   <p align="center">
   <img src="https://img.shields.io/npm/v/create-next-dashboard?style=for-the-badge&labelColor=000000">
   <img src="https://img.shields.io/npm/dw/create-next-dashboard?color=000&style=for-the-badge">
   </p>
</a>

## Live Demo

Visit [https://create-next-dashboard.vercel.app](https://create-next-dashboard.vercel.app).
You can use these credentials to login and access protected routes:

```
Email: test@test.com
Password: 12345678
```

## NPX Command

Setup a local deployment using this [`npx`](https://docs.npmjs.com/cli/v8/commands/npx) command:

```bash
npx create-next-dashboard my-app
```

## Usage

1. Create your `.env` file and provide these variables:

```shell
JWT_SECRET = // Pass-phrase to encode JWT tokens
MONGO_ATLAS_URI = // MongoDB Atlas Cloud Database Server URL, See database section below
NEXT_PUBLIC_URL = 'http://localhost:3000'
```

2. You only need to provide your `SMTP` credentials obtained from your Email provider in `.env` to enable Email features. Registering and authentication will face issues if these variables are not provided.

```shell
MAIL_SMTP_HOST =
MAIL_SMTP_USER =
MAIL_SMTP_PASS =
MAIL_SMTP_PORT =
MAIL_SMTP_SECURE = // Boolean
MAIL_SMTP_TLS_REJECT_UNAUTHORIZED = // Boolean
MAIL_SMTP_TLS_CIPHER =
MAIL_SMTP_SERVICE =
MAIL_SMTP_VERBOSE = // Boolean, Nodemailer will log details if true
```

Not all of these variables are required. For example if you're using Gmail you only need these variables:

```shell
MAIL_SMTP_USER = // Your Gmail Address
MAIL_SMTP_PASS = // Google App Password
MAIL_SMTP_SERVICE = 'Gmail'
```

3. Run `npm run dev`, the app should be running in `localhost:3000`!

## Content & Config

All configs and contents are located inside the `config` folder.

## Deployment

Refer to [Next.js Deployment Documentation](https://nextjs.org/docs/deployment) to find the best deployment strategy for you.

## Authentication

Authentication is implemented using `httpOnly` cookies served from serverless API functions.

## Database

You can spin up a MongoDB database instance using [MongoDB Atlas](http://cloud.mongodb.com/). Provide the `MOGNO_ATLAS_URI` in `.env`.

## Google Analytics

You only need to provide your `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` in `.env` file to activate your Google Analytics.

## i18n

You provide the list of languages you are willing to support in `next.config.js` file. All of the i18n content is located in the `i18n.content.js` file in config directory.

If you want to disable i18n & the select language dropdown in the Header, you only need to remove the `i18n` key from `next.config.js`. In this case the
`en` content from the `i18n.config.js` file will be served as default.

## Sending Emails

Composing and sending Email templates is handled using [Angra](https://github.com/accretence/angra).
