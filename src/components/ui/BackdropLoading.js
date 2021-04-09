import React from 'react'
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux';

const useStyle = makeStyles((theme) => ({
    root: {
        zIndex: 999
    }
}));

export const BackdropLoading = () => {

    const classes = useStyle();

    const { backDropOpen } = useSelector(state => state.ui);

    return (
        <Backdrop open={backDropOpen} className={classes.root}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
