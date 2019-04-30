LINE ReactJS Test
====

This repository is my (Ngo Xuan Bach) submission for the entry test.
This project was a fork of my current working *React Starter* project, which includes some feature that is not in your requirements.

A live version of this project is available at [**HERE**](https://line-test.surge.sh/).

> *NOTE:* This project use a mock backend backed by **localStorage**. So in case you want to start over, head to **chrome-devtools** (or alternatives of other browsers) and remove all localStorage records.

## Getting started

First, you need clone (or extract) this project and install node modules by running

```sh
npm install
```

### Start

You can start live development environment of this project by running

```sh
npm start
```

### ESLint

Coding style of this project is guaranteed by ESLint. Run ESLint with following command

```sh
npm run lint
```

### Unit test

Some piece of this project is protected with Unit Test. I used **ava** for unit testing.
Run unit tests by running this command

```sh
npm t
```

> You can see my unit tests in **test/** directory.

### Building for production

To build this project in production mode, you can use

```
npm run build
```

The built asset is available at **dist/** directory.

## License

Checkout the [**LICENSE.md**](LICENSE.md) file.
