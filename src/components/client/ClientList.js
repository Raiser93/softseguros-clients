import React from 'react'
import { Grid, Typography } from '@material-ui/core';

export const ClientList = () => {
    return (
        <Grid item md={12} className="grid-item-client">
            <Typography component="h4" variant="h4">
                Listado Clientes
            </Typography>
        </Grid>
    )
}
