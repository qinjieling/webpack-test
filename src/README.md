[打包sass] npm install sass-loader node-sass webpack --save-dev
   从下往上执行，所以必须把sass-loader放在最下面 ，把sass转成css再用css-loader编译
   不管是scss，sass都用这个，sass使用 缩进而不是花括号和分号来描述文档的格式
[样式前缀] npm i -D postcss-loader
     npm install autoprefixer -D

[babel处理es6语法]
npm install --save-dev babel-loader @babel/core
npm install @babel/preset-env --save-dev
` {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      options:{
          presets:["@babel/preset-env"]   //es6转es5的关键
      }
  } `
1. 方法一
低版本的浏览器并不能识别promise等语法，还需要polyfill
npm install --save @babel/polyfill

 options:{
    presets:[["@babel/preset-env",{
      targets:{
            chrome:"67"  //表示当浏览器>67时不需要polyfill去做es6转es5,因为>67的浏览器已经很好的支持es6语法了
      },
      useBuiltIns:'usage' //表示当低版本的浏览器无法识别的时候才用polyfill
    }]]
 }

编译完成之后发现main.js变大了，可以通过useBuiltIns:'usage' //表示当低版本的浏览器无法识别的时候才用polyfill，不会造成编译后内存过大
2. 方法二：
 npm install --save-dev @babel/plugin-transform-runtime
 options:{
   "plugins": [["@babel/plugin-transform-runtime",{  //因为polyfill会污染全局环境，plugin-transform-runtime以闭包的形式去注入
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": false,
    }]]
 }



npm install --save @babel/runtime
npm install --save @babel/runtime-corejs2
//因为polyfill会污染全局环境，plugin-transform-runtime以闭包的形式去注入

[ts打包]: npm install ts-loader typescript --save-dev
还需要配置tsconfig.json

------entry和output配置------

[entry] : 可以设置多个入口，每个入口设置一个key值

[output] : filename: '[name].js',  //name对应entry的key值


[代码分割CodeSplitting]  
webpack中实现代码分割，两种方式：
1. 同步代码：只需在webpack.config.js配置optimization
optimization:{
   splitChunks:{
      chunks:'all'
   }
}
2. 异步代码：无需做任何配置，会自动进行分割

