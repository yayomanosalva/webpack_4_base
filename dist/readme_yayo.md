


##  Webpack 4 & typescript


#### Installing TypeScript (Via yarn)

```sh
 yarn global add typescript
```

#### Installing Webpack (Via yarn)

```sh
 yarn global add webpack
 yarn add webpack --dev
 yarn add webpack-cli --dev
```

#### Create new directory

```sh
mkdir proyect proyect/src  proyect/src/app proyect/src/app/components && cd proyect && touch src/index.js

touch server.js
touch tsconfig.json
touch webpack.config.js

touch src/app/App.ts
touch src/app/components/hello.tsx
```

```sh
tree
tree -I node_modules
proyect/
├─ dist/
|-src/
  |-app/
    |-components/
      |-Hello.tsx
    |-App.tsx
    |-index.html
|-package.json
|-package-lock.json
|-server.js
|-tsconfig.json
|-webpack.config.js
```

#### yarn init
```sh
yarn init
```

#### Edit package.json

```javascript
...
"scripts": {
    "dev": "webpack --mode development",
    "build": "webpack --mode production"
    },
...
```

#### overriding the defaults entry/output

```javascript
...
"scripts": {
  "dev": "webpack --mode development ./foo/src/js/index.js --output ./foo/main.js",
  "build": "webpack --mode production ./foo/src/js/index.js --output ./foo/main.js"
},
...
```


#### Download production dependencies
```sh
yarn add react react-dom express typescript
```

#### Download development dependencies
```sh
yarn add @types/react @types/react-dom webpack webpack-cli ts-loader webpack-dev-middleware webpack-hot-middleware html-webpack-plugin source-map-loader --dev
```

#### Download development dependencies babel
```sh
yarn add babel-cli babel-core babel-loader babel-preset-env babel-preset-react --dev
```

#### Script package.json
```javascript
"script": {
    "dev": "babel-node src/index.js"
}
```
```sh
$ yarn run dev
```

### Plugins development dependencies

Explicación de los plugins instalados como dependencia de desarollo

| Plugin | README |
| ------ | ------ |
| apollo-server-express | integracion de graphql con express  |
| graphql-tools | herramientas de graphql |
| mongoose | mongodb |
| babel-cli | babel-node "npm run dev" |
| babel-core | plugin basico  |
|  babel-loader | transpila babel con webpack |
| babel-preset-env | http://babeljs.io/docs/en/env/ |
| babel-preset-react | https://babeljs.io/docs/en/babel-preset-react |
| .babelrc | configura el entorno dev "npm run dev" https://babeljs.io/docs/en/babelrc |

#### Edit html

```sh
cd src/app/index.html
cat > index.html
vim index.html
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>React with Typescript and Webpack</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

#### Edit tsconfig.json

```javascript
{
    "compilerOptions": {
      "allowSyntheticDefaultImports": true,
      "jsx": "react",
      "module": "commonjs",
      "noImplicitAny": true,
      "outDir": "./build/",
      "preserveConstEnums": true,
      "removeComments": true,
      "sourceMap": true,
      "target": "es5"
    },
    "include": [
      "./src/**/**/*"
    ]
  }
```

#### Edit webpack.config.js

```javascript
///ecmascript 5 ////
const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: ['./src/app/App.tsx', 'webpack-hot-middleware/client'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'app', 'index.html') }),
        new webpack.HotModuleReplacementPlugin()
    ]
}


///ecmascript 6 ////
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    entry: {
        app: ['./src/app/App.tsx', 'webpack-hot-middleware/client'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'app', 'index.html') }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
```


#### Edit Hello.tsx

```javascript
import * as React from 'react';
interface IProps {
   compiler: string,
   framework: string,
   bundler: string
}
export class Hello extends React.Component<IProps, {}> {
   render() {
   return <h1>This is a {this.props.framework} application using    {this.props.compiler} with {this.props.bundler}</h1>
   }
}
```

#### Edit App.tsx

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Hello } from './components/Hello';
ReactDOM.render(<Hello compiler="Typescript" framework="React" bundler="Webpack" />,
document.getElementById('root'));
```

#### Edit package.json

```javascript
...
"scripts": {
        "build": "./node_modules/.bin/webpack",
        "start": "yarn run build && node server.js"
    },
...
```

#### Edit server.js

```javascript
///ecmascript 5 ////
const path = require('path'),
   express = require('express'),
   webpack = require('webpack'),
   webpackConfig = require('./webpack.config.js'),
   app = express(),
   port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`App is listening on port ${port}`) });
app.get('/', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});
let compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
   noInfo: true, publicPath: webpackConfig.output.publicPath, stats:    { colors: true }
}));
app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static(path.resolve(__dirname, 'dist')));


///ecmascript 6 ////
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`App is listening on port ${port}`) });
app.get('/', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});
let compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
   noInfo: true, publicPath: webpackConfig.output.publicPath, stats:    { colors: true }
}));
app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static(path.resolve(__dirname, 'dist')));
```

#### Run

```sh
yarn run build && node server.js
```