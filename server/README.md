# Bearquipo - Rest API

## Rest API for an e-commerce website

---

### Development

1. Clone the repository
2. Install the dependencies using:

```sh
yarn install
```

or if you are using `npm` as a package manager:

```sh
npm install
```

3. Create the `.env` file based on the `.env.example`
4. Create the database and generate the Prisma client

```sh
yarn prisma:migrate-dev && yarn prisma:gen
```

5. Now you can start the application using:

```sh
yarn dev:ts
```

This command will start the development server using `ts-node`.
If you think that `ts-node` is slow, here is an alternative:

```sh
yarn watch
```

The `watch` command will watch your project and will compile TS to JS.
Using this command will generate a `dist` folder.
To start the development server from the `dist` folder use:

```sh
yarn dev
```

The development server will start listening to `http://localhost:${process.env.PORT}`.
