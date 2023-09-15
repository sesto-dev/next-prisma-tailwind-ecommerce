![Screenshot](https://github.com/Accretence/next-prisma-tailwind-ecommerce/assets/45223699/00444538-a496-4f90-814f-7e57a580ad17)

<div align="center"><h3>Full-Stack E-Commerce Platform</h3><p>Built using Typescript with Next.js, Prisma ORM and TailwindCSS.</p></div>
<div align="center">
<a href="https://store.accretence.com">Storefront</a> 
<span> · </span>
<a href="https://admin.accretence.com">Admin Panel</a>
</div>

## Introduction

Welcome to the open-source Next.js E-Commerce Storefront with Admin Panel project! This project is built with TypeScript, Tailwind CSS, and Prisma, providing a powerful and flexible solution for building and managing your e-commerce website.

## Features

-  **Next.js Framework**: A popular React framework for building server-rendered React applications.
-  **TypeScript**: Strongly typed codebase for improved maintainability.
-  **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
-  **Prisma**: An open-source database toolkit for Node.js that simplifies database access with type-safe queries.
-  **E-Commerce Functionality**: Implement and manage product listings, shopping cart, and orders.
-  **Admin Panel**: A user-friendly admin panel for managing products, orders, and customers.
-  **Authentication**: Secure user authentication for both customers and administrators.
-  **Responsive Design**: Mobile-friendly storefront for an optimal shopping experience.

## Development

Navigate to each of 2 apps inside the `apps` folder and go steps below:

#### Install dependencies

```sh
yarn install
```

#### Build and run packages

```sh
yarn dev
```

## Authentication

The authentication is handled using JWT tokens stored in cookies and verified inside the `middleware.ts` file. The middleware function takes in the HTTP request, reads the `token` cookie and if the JWT is successfully verified, it sets the `X-USER-ID` header with the userId as the value, otherwise the request is sent back with 401 status.

## Authors

-  Amirhossein Mohammadi ([@accretence](https://accretence.com))

## License

MIT License
