import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2';

import {
    Button,
    Typography,
    Grid,
    TextField,
    makeStyles,
    Box
} from '@material-ui/core';
import { 
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { clientStarAddNew, clientStartUpdate } from '../../actions/clients';
import { BackdropLoading } from '../ui/BackdropLoading';
import { uiOpenBackDrop } from '../../actions/ui';

const initialState = {
    name: '',
    email: '',
    document_number: '',
    date_birth: null
}

const useStyle = makeStyles((theme) => ({
    'box-title': {
        marginBottom: '1rem'
    },
    'box-input': {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    'custom-input': {
        width: '100%',
        marginLeft: '1rem',
        marginRight: '1rem'
    },
    'box-button': {
        display: 'flex',
        marginLeft: '1rem',
        marginRight: '1rem',
        justifyContent: 'flex-end',
        '& button': {
            marginLeft: '1rem'
        }
    }
}));

export const ClientCreate = () => {
    // Estilos
    const classes = useStyle();

    // Manejo de rutas
    const history = useHistory();

    // Inicializando datos del formulario
    const [clientFormValues, setClientFormValues] = useState(initialState);


    // Clientes
    const { clientActive } = useSelector(state => state.client);

    // Dispatch
    const dispatch = useDispatch();

    // Valores
    const { name, email, document_number, date_birth } = clientFormValues;


    useEffect(() => {
        if (clientActive) {
            setClientFormValues(clientActive);
        } else {
            setClientFormValues(initialState);
        }
    }, [clientActive, setClientFormValues])

    const handleDateChange = (date) => {
        if (date && date.isValid()) {
            console.log(date.toDate());
            setClientFormValues({
                ...clientFormValues,
                date_birth: date ? moment(date).toDate() : ''
            });
        }
    }

    const handleInputChange = ({target}) => {
        setClientFormValues({
            ...clientFormValues,
            [target.name]: target.value
        });
    }

    const handleSaveChangeClient = (e) => {
        e.preventDefault();
        if (name.trim().length < 1) {
            Swal.fire('Faltan Campos', 'El nombre es requerido', 'warning');
            return;
        }
        if (email.trim().length < 1) {
            Swal.fire('Faltan Campos', 'El correo es requerido', 'warning');
            return;
        }
        if (document_number.trim().length < 1) {
            Swal.fire('Faltan Campos', 'El numero de documento es requerido', 'warning');
            return;
        }
        if (!date_birth || !moment(date_birth).isValid()) {
            Swal.fire('', 'Fecha de nacimiento no valida', 'warning');
            return;
        }


        // Se abre el backdrop mientra se hace las peticiones de crear o editar
        dispatch(uiOpenBackDrop());

        // Validacion para editar o crear un cliente
        if (clientActive) {
            dispatch(clientStartUpdate(clientFormValues));
        } else {
            dispatch(clientStarAddNew({
                ...clientFormValues
            }));
        }

        // history.push('/client/list');
    }

    return (
        <Grid item md={12} className="grid-item-client">

            {/* Titulo de la vista */}
            <Box component="div" className={classes['box-title']}>
                <Typography component="h4" variant="h4">
                    { 
                        (clientActive) ? 'Modificando Cliente' : 'Nuevo Cliente'
                    }
                </Typography>
            </Box>

            {/* Formulario */}
            <form onSubmit={handleSaveChangeClient}>
                <Box component="div" className={classes['box-input']}>
                    {/* Input de nombre completo */}
                    <TextField
                        required
                        className={classes['custom-input']}
                        label="Nombre Completo"
                        name="name"
                        autoComplete="off"
                        onChange={handleInputChange}
                        variant="outlined"
                        value={name} />
                    
                    {/* Input de correo */}
                    <TextField
                        label="Correo"
                        required
                        className={classes['custom-input']}
                        name="email"
                        type="email"
                        autoComplete="off"
                        onChange={handleInputChange}
                        variant="outlined"
                        value={email} />
                </Box>

                <Box component="div" className={classes['box-input']}>
                    {/* Input de numero de documento */}
                    <TextField
                        label="Numero de documento"
                        className={classes['custom-input']}
                        required
                        name="document_number"
                        type="text"
                        autoComplete="off"
                        onChange={handleInputChange}
                        variant="outlined"
                        value={document_number}></TextField>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            className={classes['custom-input']}
                            variant="inline"
                            format="YYYY/MM/DD"
                            label="Fecha de nacimiento"
                            name="date_birth"
                            value={date_birth}
                            onChange={handleDateChange}
                            helperText="yyyy/mm/dd"
                            required
                            inputVariant="outlined"
                        />
                    </MuiPickersUtilsProvider>
                </Box>

                {/* Acciones */}
                <Box component="div" className={ classes['box-button'] }>
                    <Button color="secondary" variant="contained" onClick={ () => history.push('/client/list') } type="button">
                        Cancelar
                    </Button>

                    <Button color="primary" variant="contained" onClick={ handleSaveChangeClient } type="submit">
                        Guardar
                    </Button>
                </Box>
            </form>
            
            {/* Vista de carga */}
            <BackdropLoading />
        </Grid>
    )
}
