import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './index.css'
import Home from './Home'
import PageNotFound from './PageNotFound'
import Edit from './Edit'
import View from './View'

export const URL_BASE = 'http://<ip_servidor>:8080'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" component={ Home } exact />
            <Route path="/view/:id" component={ View } />
            <Route path="/edit/:id/:name/:description" component={ Edit } />
            <Route component={ PageNotFound } />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
)