const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/js/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },

      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" ,// translates CSS into CommonJS
            options: { importLoaders: 1 }
       
          }, {
          loader: "postcss-loader" // compiles Sass to CSS
      },{
        loader: "sass-loader" // compiles Sass to CSS
    }
    
    ]
     }
      
  ]
}
}

