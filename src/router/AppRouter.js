import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { ClientCreate } from '../components/client/ClientCreate';
import { ClientList } from '../components/client/ClientList';

export const AppRouter = () => {
    return (
        <Router>

            <Switch>

                <Route exact path="/client/list" component={ClientList} />
                <Route exact path="/client/create" component={ClientCreate} />

                <Redirect to="/client/list" />

            </Switch>

        </Router>
    )
}
