import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route as RouteReact} from 'react-router-dom'
import Login from './login/Login'
import Map from './map/Map'
import Route from './route/Route'
import Page404 from './404'
import './css-reset.css'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <RouteReact path="/" component={ Login } exact />
            <RouteReact path="/map" component={ Map } exact />
            <RouteReact path="/route" component={ Route } exact />
            {/* <Route path="/edit/:id/:value1/:value2" component={ Edit } /> */}
            <RouteReact component={ Page404 } />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
)