import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../containers/app'
import Home from './home'
import About from './about'

require('font-awesome/css/font-awesome.css')

const routes = (
  <Route path='/' component={App} >
    <IndexRoute component={Home} />
    <Route path='about' component={About} />
  </Route>
);

export default routes;
