import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Moment
import moment from 'moment';
import 'moment/locale/es';

// Actions
import { clearClientSelected, clientSelected, clientStartDelete, clientStartLoading, clientStartSearch } from '../../actions/clients';
import { uiOpenBackDrop } from '../../actions/ui';


// Elementos del diseño
import {
    Grid,
    Typography,
    ButtonGroup,
    IconButton,
    Button,
    makeStyles,
    Box,
    InputAdornment,
    TextField,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    Divider
} from '@material-ui/core';
import { BackdropLoading } from '../ui/BackdropLoading';

// Icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

import Swal from 'sweetalert2';

// Se traduce al español las fechas
moment.locale('es');

// Se declaran los estilos
const useStyle = makeStyles((theme) => ({
    'box-title': {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1rem'
    },
    'box-input': {
        width: '100%',
        marginBottom: '1rem'
    },
    'text-field-search': {
        width: '100%',
    },
    inline: {
        display: 'inline'
    },
    'list-clients': {
        maxHeight: '100%',
        overflow: 'auto',
        overflowX: 'hidden'
    }
}));

export const ClientList = () => {

    // Estilos
    const classes = useStyle();

    // Clientes
    const {clients} = useSelector(state => state.client);
    // Iniciar acciones
    const dispatch = useDispatch();
    // Manejo de rutas
    const history = useHistory();

    // Effect para cargar los clientes
    useEffect(() => {
        dispatch(clientStartLoading());
    }, [dispatch]);

    /**
     * Funcion para seleccionar un cliente a editar y redireccionar a la vista de crear cliente
     */
    const handleEditClient = (client) => {
        dispatch(clientSelected(client));
        history.push('/client/create');
    }
    
    /**
     * Funcion para eliminar/cambiar de estado el cliente seleccionado
     */
    const handleRemoveClient = async (idClient) => {

        const { value } = await Swal.fire({
            title: '¿Seguro desea eliminar el cliente?',
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonText: 'Sí',
            icon: 'warning'
        });

        if (value) {
            dispatch(uiOpenBackDrop());
            dispatch(clientStartDelete(idClient));
        }
    }

    /**
     * Funcion para redireccionar a la vista de crear cliente
     */
    const handleGoToCreateClient = () => {
        dispatch(clearClientSelected());
        history.push('/client/create');
    }

    // Funcion para buscar clientes
    const hanldeKeyEnter = (event) => {
        if (event.key === 'Enter') {
            const char = event.target.value || '';
            if (char.trim().length) {
                dispatch(clientStartSearch(char));
            } else {
                dispatch(clientStartLoading());
            }
        }
    }

    return (
        <Grid item md={12} className="grid-item-client">

            <Box component="div" className={classes['box-title']}>
                {/* Titulo de la vista */}
                <Typography component="h4" variant="h4">
                    Listado Clientes
                </Typography>

                {/* Boton para redireccionar a la vista de crear cliente */}
                <Button
                    onClick={handleGoToCreateClient}
                    variant="contained"
                    color="default"
                    disableElevation
                    startIcon={ <AddIcon />}>
                    Nuevo Cliente
                </Button>
            </Box>

            <Box component="div" className={classes['box-input']}>
                {/* Campo de texto para buscar clientes */}
                <TextField
                    onKeyUp={hanldeKeyEnter}
                    className={classes['text-field-search']}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    placeholder="Buscar Cliente, Ingrese nombre o fecha de nacimiento"
                    variant="outlined"
                />
            </Box>
            
            <List className={classes['list-clients']}>
                { clients.map((client) => (
                    
                    <Box key={client.id} component="div">
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar>
                                    {
                                        // Se muestra la letra inicial del nombre del cliente
                                        client.name[0].toUpperCase()
                                    }
                                </Avatar>
                            </ListItemAvatar>

                            <ListItemText
                                // Nombre del cliente
                                primary={client.name}
                                secondary={
                                    <React.Fragment>
                                        {/* Correo del cliente */}
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            { client.email }
                                        </Typography>
                                        {/* Fecha de nacimiento | fecha de creación */}
                                        { ` - ${moment(client.date_birth).format('YYYY MMMM DD')} | ${moment(client.createdAt).format('YYYY MMMM DD')}` }
                                    </React.Fragment>
                                }
                            />

                            <ListItemSecondaryAction>
                                <ButtonGroup>

                                    {/* Boton para editar cliente */}
                                    <IconButton color="primary" onClick={ (e) => {handleEditClient(client)} }>
                                        <EditIcon />
                                    </IconButton>

                                    {/* Boton para eliminar cliente */}
                                    <IconButton color="secondary" onClick={ (e) => {handleRemoveClient(client.id)} }>
                                        <DeleteIcon />
                                    </IconButton>

                                </ButtonGroup>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider key={client.id} variant="inset" component="li" />
                    </Box>

                )) }

            </List>
            
            <BackdropLoading />
        </Grid>
    )
}
