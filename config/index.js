// see http://vuejs-templa
// tes.github.io/webpack for documentation.
var path = require('path');
var os = require('os');
var networkInterfaces = os.networkInterfaces();
var ip;

for (var key in networkInterfaces) {
  networkInterfaces[key].forEach(item => {
    if (!item.internal && item.family === 'IPv4') {
      ip = item.address;
    }
  });
}

module.exports = {
  build: {
    env: require('./prod.env'),
    port: 8082,
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/lend-app/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all staticø assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8081,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/www.vodtw.com': {
        target: 'http://www.vodtw.com',
        changeOrigin: true,
        pathRewrite: {
          '^/www.vodtw.com': ''
        }
      },
      '/m.vodtw.com': {
        target: 'http://m.vodtw.com',
        changeOrigin: true,
        pathRewrite: {
          '^/m.vodtw.com': ''
        }
      },
      '/www.biquge.lu': {
        target: 'http://www.biquge.lu',
        changeOrigin: true,
        pathRewrite: {
          '^/www.biquge.lu': ''
        }
      },
      '/www.xxbiquge.com': {
        target: 'http://www.xxbiquge.com',
        changeOrigin: true,
        pathRewrite: {
          '^/www.xxbiquge.com': ''
        }
      },
      '/www.kanshula.com': {
        target: 'http://www.kanshula.com',
        changeOrigin: true,
        pathRewrite: {
          '^/www.kanshula.com': ''
        }
      },
      '/www.23us.la': {
        target: 'http://www.23us.la',
        changeOrigin: true,
        pathRewrite: {
          '^/www.23us.la': ''
        }
      },
      '/www.biquwu.cc': {
        target: 'http://www.biquwu.cc',
        changeOrigin: true,
        pathRewrite: {
          '^/www.biquwu.cc': ''
        }
      },
      '/www.baoliny.com': {
        target: 'http://www.baoliny.com',
        changeOrigin: true,
        pathRewrite: {
          '^/www.baoliny.com': ''
        }
      },
      '/www.qu.la': {
        target: 'http://www.qu.la',
        changeOrigin: true,
        pathRewrite: {
          '^/www.qu.la': ''
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
