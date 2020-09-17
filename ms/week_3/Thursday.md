## 우아한 테크러닝 React&Typescript 6회차

2020년 09월 17일 목요일

<details><summary>Table of Contents</summary>

-   webpack [:link:](#webpack)
-   Loader [:link:](#loader)
-   Plugin [:link:](#plugin)

</details>

### webpack

`webpack`은 일반적으로 `webpack.config.js`라는 이름을 갖는 설정 파일을 갖는다.<br/>
`webpack`은 `node`에서 실행되며 작성한 **설정 값을 담은 객체**을 읽어 처리하게 된다.<br/>

```javascript
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
```

`node`에서 실행되기 때문에 **모듈**을 사용하기 위해서는 위와 같이 `require`를 사용해야한다.<br/>
설정 값을 담은 객체를 생성하기 위해 아래와 같이 `config` 객체를 생성하고 모듈로 내보낸다.<br/>

```javascript
const config = {};

module.exports = config;
```

`webpack` 설정의 `entry`는 `webpack` 실행 시 진입점을 가리키는 파일을 작성하게 된다.<br/>
`core-js`는 **polyfill** 라이브러리이며 Javascript 문법을 **트랜스파일링**하기 위해 사용한다.<br/>

```javascript
const config = {
    // ...
    entry: {
        main: ["core-js", "./src/index.tsx"],
    },
    // ...
};
```

`webpack`은 굉장히 거대하지만 `webpack`이 해주는 일은 그렇게 많지 않다.<br/>
자세한 속성들은 [webpack 공식문서](https://webpack.js.org/concepts/)를 참고하면 좋을 것 같다.<br/>

### Loader

`webpack`에서 `loader`는 `redux`의 미들웨어와 같은 역할을 한다 생각하면 된다.<br/>
`entry`를 통해 읽어들인 파일은 `loader`로 넘어가게 되며 각각의 `loader`의 역할을 수행한다.<br/>
`loader`는 설정 파일의 `module` 속성에 작성되며 `rules` 배열에 아래와 같이 기술된다.<br/>

```javascript
const config = {
    // ...
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                include: path.resolve("src"),
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "./images/",
                },
            },
        ],
    },
    // ...
};
```

Typescript를 사용하기 위해서는 `ts-loader`같은 `loader`를 사용했지만 현재는 `babel`이 지원한다.<br/>

### Plugin

`Plugin`은 `loader`보다 더 복잡하며 훨씬 더 많은 일을 할 수 있다.<br/>
`plugin`은 `webpack` 설정 객체의 `plugins` 배열에 지정한다.<br/>

```javascript
const config = {
    // ...
    plugins: [
        new webpack.SourceMapDevToolPlugin({}),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
    ],
    // ...
};
```

보통의 `plugin`은 `loader`가 모두 실행된 후 실행되게 된다.<br/>
`plugin`의 종류는 굉장히 많으며 필요한 기능을 갖는 라이브러리를 설치해 추가하면 된다.<br/>
