import React from 'react'
import { Provider } from 'react-redux';

import { store } from './store/store';
import { AppRouter } from './router/AppRouter';

import { Container, Grid } from '@material-ui/core';
import './style.css';

export const ClientApp = () => {
    return (
        <Provider store={store}>
            <div className="main">
                <Container>
                    <Grid container direction="row" justify="center" alignItems="center" className="grid-container-client">
                        <AppRouter />
                    </Grid>
                </Container>
            </div>
        </Provider>
    )
}
