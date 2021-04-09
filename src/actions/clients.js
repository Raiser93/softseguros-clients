import Swal from "sweetalert2";
import { fetchDefault } from "../helpers/fetch";
import { types } from "../types/types";

/**
 * accion para seleccionar un cliente a editar
 * @param client 
 */
export const clientSelected = (client ) => ({
    type: types.clientSelected,
    payload: client
});

export const clientStartDelete = (idClient) => {
    return async (dispatch) => {
        try {
            const resp = await fetchDefault(`client/change-status-client/${idClient}`, {}, 'PUT');
            const body = await resp.json();

            if (body.ok) {
                dispatch(clientDelete(idClient));
            } else {

            }
        } catch (error) {
            console.log(error);
        }
    }
}

/**
 * accion para eliminar un cliente
 */
const clientDelete = (idClient ) => ({
    type: types.clientDelete,
    payload: idClient
});

/**
 * Accion para borrar seleccion de un cliente
 */
export const clearClientSelected = () => ({
    type: types.clearClientSelected
});

/**
 * Accion para almacenar un cliente
 */
export const clientStarAddNew = (client) => {
    return async(dispatch) => {
        console.log(client);
        try {
            const resp = await fetchDefault('client/create-client', client, 'POST');
            const body = await resp.json();
    
            console.log(body);
            if (body.ok) {
                dispatch(createClient(body.client))
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            
        }
    }
};
// Accion cuando se termina de almacenar un cliente
const createClient = (client) => ({
    type: types.createClient,
    payload: client
});

// Accion para actualizar un cliente de la base de datos
export const clientStartUpdate = (client) => {
    return async (dispatch) => {

        try {
            const resp = await fetchDefault(`client/update-client/${client.id}`, client, 'PUT');
            const body = await resp.json();

            if (body.ok) {
                dispatch(updateClient(client));
            } else {

            }
        } catch (error) {
            console.log(error);            
        }
    }
}

/**
 * Accion para actualizar un cliente
 */
const updateClient = (client) => ({
    type: types.updateClient,
    payload: client
});

/**
 * Accion para obtener todos los clientes activos de la base de datos
 * @returns 
 */
export const clientStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchDefault('client/all');
            const body = await resp.json();

            if (body.ok) {
                dispatch(clientLoaded(body.clients));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

// Accion para mostrar en la vista los clientes
const clientLoaded = (clients) => ({
    type: types.clientLoaded,
    payload: clients
});

export const clientStartSearch = (char) => {
    return async (dispatch) => {
        try {
            const resp = await fetchDefault('client/search?char='+char,);
            const body = await resp.json();
            
            if (body.ok) {
                console.log(body);
                dispatch(clientLoaded(body.clients));
            } else {

            }
        } catch (error) {
            console.log(error);
        }
    }
}