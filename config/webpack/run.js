var webpack = require('webpack')
var spawn = require('child_process').spawn
var bs = require('browser-sync').create()

var proxyMiddleware = require('http-proxy-middleware')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')

// Get server config
var client = require('./dev')
client.context = undefined

// Setup webpack compiler
var bundler = webpack(client)

// Other stuff
var port = 8999
var proxyPort = port + 1

// Other stuff
var spawnArgs = ['build/server.js']
var running = null
var initial = false
var config = require('./server')
var compiler = webpack(config)

// Spawn server
function start() {
  return new Promise(resolve => {
    running = spawn('node', spawnArgs)
    running.stdout.on('data', data => {
      var msg = data.toString().replace(/\n$/, '')
      if (msg.match(/Server started/)) {
        if (!initial) {
          console.log(msg)
          initial = true
        } else {
          console.log('server reloaded')
        }
      } else {
        console.log(msg)
      }

      resolve()
    })

    running.stderr.on('data', data => 
      console.error(data.toString().replace(/\n$/, '')))
  })
}

function filter(path, req) {
  return !path.match('^/browser-sync')
}

console.log('starting browserSync at ', proxyPort)
bs.init({
  port: proxyPort,
  open: false,
  notify: false,
  server: {
    baseDir: '../../build',
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: '/public',
        noInfo: true,
        stats: {
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false
        },
      }),
      webpackHotMiddleware(bundler),
      proxyMiddleware(filter, {
        target: `http://localhost:${port}`,
        changeOrigin: true,
        ws: true,
        logLevel: 'warn'
      }),
    ]
  }
})

// compiler.watch({
//   aggregateTimeout: 300,
//   poll: true,
//   stats: {
//     colors: true,
//     version: false,
//     hash: false,
//     timings: false,
//     chunks: false,
//     chunkModules: false
//   },
// }, function(err, stats) {
//   console.log(stats.toString({colors: true}))

//   if (running) {
//     console.log('killing running server')
//     running.kill()
//   }
//   setTimeout(() => {
//     console.log('starting server')
//     start()
//   }, 10)
// })
