import React from 'react'
import { AppRouter } from './router/AppRouter';
import { Container, Grid } from '@material-ui/core';
import './style.css';

export const ClientApp = () => {
    return (
        <div className="main">
            <Container>
                <Grid container direction="row" justify="center" alignItems="center" className="grid-container-client">
                    <AppRouter />
                </Grid>
            </Container>
        </div>
    )
}
