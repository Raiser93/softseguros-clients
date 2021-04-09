import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';
import 'moment/locale/es';

import { clearClientSelected, clientSelected, clientStartDelete, clientStartLoading, clientStartSearch } from '../../actions/clients';

import {
    Grid,
    Typography,
    TableContainer,
    Paper,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    ButtonGroup,
    IconButton,
    Button,
    TextField
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';


moment.locale('es');

export const ClientList = () => {

    // Clientes
    const {clients} = useSelector(state => state.client);
    // Iniciar acciones
    const dispatch = useDispatch();
    // Manejo de rutas
    const history = useHistory();

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
    const handleRemoveClient = (idClient) => {
        dispatch(clientStartDelete(idClient));
    }

    /**
     * Funcion para redireccionar a la vista de crear cliente
     */
    const handleGoToCreateClient = () => {
        dispatch(clearClientSelected());
        history.push('/client/create');
    }

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
            <Typography component="h4" variant="h4">
                Listado Clientes
            </Typography>

            <Button
                onClick={handleGoToCreateClient}
                variant="contained"
                color="default"
                disableElevation={true}
                startIcon={ <AddIcon />}>
                Nuevo Cliente
            </Button>

            <TextField
                onKeyUp={hanldeKeyEnter}
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nombre</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Fecha de Nacimiento</TableCell>
                            <TableCell align="center">Fecha de creación</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {clients.map((client) => (
                            <TableRow key={client.id}>
                                <TableCell align="center">
                                    { client.name }
                                </TableCell>

                                <TableCell align="center">
                                    { client.email }
                                </TableCell>

                                <TableCell align="center">
                                    { moment(client.date_birth).format('YYYY MMMM DD') }
                                </TableCell>

                                <TableCell align="center">
                                    { moment(client.createdAt).format('YYYY MMMM DD') }
                                </TableCell>

                                <TableCell align="center">
                                    <ButtonGroup>

                                        <IconButton color="primary" onClick={ (e) => {handleEditClient(client)} }>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton color="secondary" onClick={ (e) => {handleRemoveClient(client.id)} }>
                                            <DeleteIcon />
                                        </IconButton>

                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
        </Grid>
    )
}
