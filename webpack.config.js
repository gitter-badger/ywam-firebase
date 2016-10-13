var path    = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AppCachePlugin = require('appcache-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');



module.exports = {
  devtool: 'sourcemap',
  entry: {},
  module: {
    loaders: [
       { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel' },
       { test: /\.html$/, loader: 'raw' },
       { test: /\.styl$/, loader: 'style!css!stylus' },
       { test: /\.css$/, loader: 'style!css' },
       
       { test: /\.json$/, loader: 'json' },
       { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
       { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
      
    ]
  },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      inject: 'body',
      // hash: true
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    }),

    new AppCachePlugin({
      cache: ['apple-touch-icon-120x120-precomposed.png',
              // 'css/angular-material.min.css',
              // 'css/font-awesome.min.css'
              ],
      exclude: ['file.txt', /.*\.map$/],  // Exclude file.txt and all .map files 
      output: 'app.manifest'
    }),
    
    new CopyWebpackPlugin([
            { from: 'client/favicon', to:'' },
             { from: 'client/sounds', to:'sounds' },
              { from: 'client/logos', to:'logos' },
            // { from: 'client/square_space_scripts', to:'square_space_scripts' },
            // { from: 'node_modules/angular-material/angular-material.min.css', to:'css' },
            // { from: 'node_modules/font-awesome/css/font-awesome.min.css', to:'css' }
        ]),

    

  ]
};
