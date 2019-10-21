---
title: webpack
---

# webpack

## Getting-Started

1. webpack을 global로 설치

```js
npm i webpack-cli -g
```

2. package.json를 생성

```text
npm init -y
```

3. index.js & index.html 를 생성

```html
<!-- index.html -->
<html>
  <head>
    <title>webpack 2 demo</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="src/index.js"></script>
  </body>
</html>
```

```js
// index.js
function component() {
  var element = document.createElement("div");

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  return element;
}

document.body.appendChild(component());
```

4. 다음 항목들을 index.js에 추가합니다.

```js
// index.js
// import & export is ES6 that doesn't work in the browser
// but webpack would replace them with compatible wrapper code
+ import _ from 'lodash';
```

```html
<!-- 삭제 -->
-
<script src="https://unpkg.com/lodash@4.16.6"></script>
<!-- 삭제 -->
-
<script src="src/index.js"></script>
<!-- 추가 -->
+
<script src="dist/main.js"></script>
```

5. `webpack --mode=none`를 실행하고 index.html을 웹브라우저에서 엽니다.

```html
Hello webpack
```

6. webpack.config.js에 다음 내용을 추가합니다.

```js
// webpack.config.js
// `webpack` command will pick up this config setup by default
var path = require("path");

module.exports = {
  mode: "none",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

---

## Example 1 - CSS Code Splitting

- As for CSS files, use `css-loader`for default setting. The extra option `ExtractTextWebpackPlugin` is available for better performance

```text
npm i css-loader style-loader --save-dev
npm i webpack mini-css-extract-plugin --save-dev
```

1. Create a new `package.json`

```bash
npm init -y
```

2. Install the necessary loaders and plugins using the commands above
3. Add index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>CSS & Libraries Code Splitting</title>
  </head>
  <body>
    <header>
      <h3>CSS Code Splitting</h3>
    </header>
    <div>
      <p>
        This text should be colored with blue after injecting CSS bundle
      </p>
    </div>
    <script src="dist/bundle.js"></script>
  </body>
</html>
```

4. Add `base.css`

```css
p {
  color: blue;
}
```

5. Add `app/index.js`

```js
import "../base.css";
```

6. Add `webpack.config.js`

```js
var path = require("path");

module.exports = {
  mode: "none",
  entry: "./app/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

7. Add ExtractPlugin to exract the bundled css filename

```js
// webpack.config.js
var path = require("path");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};
```

---

## Example 2 - Libraries Code Splitting

- When using a couple of libraries, should you import them at the very beginning of bundling all files to avoid repetitively use them in every build.

```text
npm install webpack --save-dev
npm install moment lodash --save
npm i webpack-manifest-plugin --save-dev
```

1. `package.json`를 생성합니다.

```
npm init -y
```

2. 위의 명령어를 참조하여 필요한 loaders와 plugins을 설치합니다.
3. `index.html`를 추가합니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Libraries Code Splitting</title>
  </head>
  <body>
    <header>
      <h3>Libraries Code Splitting</h3>
    </header>
    <div>
      <label for="p1"><strong>Moment JS : </strong></label>
      <p class="p1">
        not yet loaded
      </p>
      <label for="p2"><strong>Lodash JS : </strong></label>
      <p class="p2">
        not yet loaded
      </p>
    </div>
    <script src="dist/vendor.js"></script>
    <script src="dist/main.js"></script>
  </body>
</html>
```

4. `app/index.js`를 추가합니다.

```js
var moment = require("moment");
var _ = require("lodash");
var ele = document.querySelectorAll("p");

document.addEventListener("DOMContentLoaded", function(event) {
  ele[0].innerText = moment().format();
  ele[1].innerText = _.drop([1, 2, 3], 0);
});
```

5. `webpack.config.js`를 추가합니다.

```js
var webpack = require("webpack");
var path = require("path");

module.exports = {
  mode: "none",
  entry: {
    main: "./app/index.js",
    vendor: ["moment", "lodash"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

6.아래 내용을 webpack.config.js에 추가합니다.

```js
// 1
output: {
  // ...
},
optimization: {
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'all'
      }
    }
  }
}
```

---

## Example 3 - Webpack Dev Server Setting

- Initial development setting to make the build process easier

```
npm install webpack webpack-cli webpack-dev-server --save-dev
webpack-dev-server --open
```

- or add this 'dev' script to `package.json` to launch the dev server

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "webpack-dev-server"
},
```

1. Create a new `package.json` and type the commands above
2. Add `index.html`

```html
<html>
  <head>
    <title>Webpack Dev Server</title>
  </head>
  <body>
    <div class="container">
      hello
    </div>
    <script src="/dist/bundle.js"></script>
  </body>
</html>
```

3. Add `app/index.js`

```js
var ele = document.getElementsByClassName("container")[0];
ele.innerText = "Webpack loaded!!";
```

4. Add `webpack.config.js`

```js
var path = require("path");

module.exports = {
  mode: "none",
  entry: "./app/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist",
  },
  devtool: "cheap-eval-source-map",
  devServer: {
    publicPath: "/dist/",
    port: 9000,
  },
};
```

5. Run `npm run dev` to launch the Webpack Dev Server

> Please keep in mind that the **webpack devserver compiles in memory** not emits bundled file in output.path

---

## Example 4 - Webpack Dev Middleware

- Have a full control over already installed Node.js by installing the commands below

```
npm install webpack --save
npm install express webpack-dev-middleware --save-dev
```

1. Create a new `package.json` and type the commands above
2. Add `index.html`

```html
<html>
  <head>
    <title>Webpack Dev Middleware</title>
  </head>
  <body>
    <div class="container">
      hello
    </div>
    <script src="/dist/bundle.js"></script>
  </body>
</html>
```

3. Create a new `server.js` file and add Express & EJS in it

```js
var express = require("express");
var app = express();
var path = require("path");

app.use(express.static(__dirname));

// view engine setup
// __dirname : root folder
app.set("views", path.join(__dirname));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.get("/", function(req, res) {
  res.send("index");
});

app.listen(3000);
console.log("Server running on port 3000");
```

4. Run `server.js` and make sure it doens't cause any errors
5. Add `app/index.js`

```js
var ele = document.getElementsByClassName("container")[0];
ele.innerText = "Webpack loaded!!";
```

6. Add `webpack.config.js`

```js
var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./app/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "http://localhost:3000/dist",
  },
};
```

7. Add the codes below to `server.js`

```js
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");
var compiler = webpack(webpackConfig);
```

```js
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
  }),
);
```

---

## Example 5 - Webpack Plugins

- Besides loader, plugins offer a wide variety of different features that Loaders don't provide

1. Create a new `package.json` and install plugins below

```
npm init -y && npm install webpack jquery --save-dev
```

2. Add `index.html`

```html
<html>
  <head>
    <title>Webpack Plugins</title>
  </head>
  <body>
    <script src="dist/bundle.js"></script>
  </body>
</html>
```

3. Add `app/index.js`

```js
var $ = require("jquery");
console.log("loaded jQuery version is " + $.fn.jquery);
```

4. Add `webpack.config.js`

```js
var path = require("path");
var webpack = require("webpack");

module.exports = {
  mode: "none",
  entry: "./app/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

5. run `webpack`
6. add this code below to see how Provide Plugin works

```js
module.exports = {
  output: {
    // ...
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
    }),
  ],
};
```

7. comment out the first line that loads jquery library in `app/index.js`

```js
// var $ = require('jquery');
console.log("loaded jQuery version is " + $.fn.jquery);
```
