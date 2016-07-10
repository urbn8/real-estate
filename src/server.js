import 'source-map-support/register'

// native packages
import path from 'path'

// external packages
import helmet from 'helmet'
import compress from 'compression'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import nconf from 'nconf'
import _ from 'lodash'

// feathersjs
import feathers, { static as serveStatic } from 'feathers'
import hooks from 'feathers-hooks'
import rest from 'feathers-rest'
import socketio from 'feathers-socketio'
import errors from 'feathers-errors'
import log from 'loglevel'

// internal packages
import middleware from './middleware'
import services from './services'

// react external packages (universal rendering)
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import Helmet from 'react-helmet'
import { toJS } from 'mobx'

// react internal packages
import routes from './shared/routes'
import { ContextProvider } from './shared/context'
import { fetchData } from './shared/store/helpers'
import { NewStore } from './shared/store'

// const release = (process.env.NODE_ENV === 'production')
// const port = (parseInt(process.env.PORT, 10) || 9000) - !release;

// const app = express();
const app = feathers()

// Setup nconf to use (in-order):
// 1. Environment variables
// 2. A file located at '../config/default.json'
const configPath = path.join(path.resolve('.'), 'config/default.json')
nconf.env().file({file: configPath})

// do not log secrects
log.info('environment settings are: ', _.pickBy(nconf.get(), (value, key) => _.startsWith(key, 'SETTINGS_') && key.indexOf('SECRET') === -1 ))

log.setLevel(nconf.get('SETTINGS_LOG_LEVEL'))

// Route handler that rules them all!
const isomorphic = (req, res) => {

  // turn of server rendering on development for easier debugging
  // if (process.env.NODE_ENV !== 'production') {
  //   const store = NewStore({
  //     ssrLocation: req.url,
  //   })

  //   const state = toJS(store)
  //   log.debug('state')

  //   const config = {
  //     env: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  //     logLevel: nconf.get('SETTINGS_LOG_LEVEL'),
  //   }

  //   return res.status(200).render('index', {
  //     head: {
  //       title: '',
  //       meta: '',
  //       link: '',
  //       htmlAttributes: ''
  //     }, renderedRoot: '', store: state, config: config,
  //   })
  // }

  // Do a router match
  match({
    routes,
    location: req.url,
  }, (err, redirect, props) => {
    // Some sanity checks
    if (err) {
      return res.status(500).send(err.message)
    } else if (redirect) {
      return res.redirect(302, redirect.pathname + redirect.search)
    } else if (!props) {
      return res.status(404).send('not found')
    }

    const store = NewStore({
      ssrLocation: req.url,
    })

    return fetchData(store, props.components, props.params, props.location.query)
      .then(() => {
        let renderedRoot
        if (process.env.NODE_ENV !== 'production') {
          renderedRoot = ''
        } else {
          renderedRoot = ReactDOMServer.renderToString((
            <ContextProvider context={{ store }}>
              <RouterContext { ...props } />
            </ContextProvider>
          ))
        }

        const state = toJS(store)
        const config = {
          env: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
          logLevel: nconf.get('SETTINGS_LOG_LEVEL'),
        }

        const head = Helmet.rewind()

        res.status(200).render('index', {
          head, renderedRoot, store: state, config,
        })
      })
      .catch((err1, err2) => {
        log.error('error while handling routing', { error: [err1, err2] })
        res.status(500).send('Internal error')
      })
  })
}

app.use(compress())
  .use(favicon(path.join(nconf.get('SETTINGS_PUBLIC'), 'favicon.ico')))
  .use('/public', serveStatic(nconf.get('SETTINGS_PUBLIC')))
  .use('/vendor.js', serveStatic('./build/vendor.js'))
  .use('/client.js', serveStatic('./build/client.js'))
  .use('/styles.css', serveStatic('./build/styles.css'))
  .set('views', './src/server/views')
  .set('view engine', 'ejs')
  .use(helmet())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(services)
  .get('*', isomorphic)
  // .configure(middleware)

const port = nconf.get('SETTINGS_PORT')
const server = app.listen(port)
server.on('listening', () =>
  log.info(`[🚀 ] Server started on port ${ port }`)
)
