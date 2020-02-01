const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
    entry: './src/app/main.js',
    output: {
      path: path.join(__dirname,'/src/public/js'),
      filename: 'bundle.js'
    },
    module:{
      rules:[
        {
          test:/\.js$/,
          loader: 'babel-loader',
          exclude:/node_modules/ 
        },
        {
          test:/\.vue$/,
          exclude: /node_modules/,
          use:{
            loader: 'vue-loader'
          } 
        }
      ]
    },
    plugins: [
      // make sure to include the plugin for the magic
      new VueLoaderPlugin()
    ]
  };
