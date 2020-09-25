import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './index.css'
import Home from './Home'
import PageNotFound from './PageNotFound'
import Edit from './Edit'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" component={ Home } exact />
            <Route path="/edit/:id/:value1/:value2" component={ Edit } />
            <Route component={ PageNotFound } />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
)