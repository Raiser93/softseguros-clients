import { types } from "../types/types";

/**
 * accion para seleccionar un cliente a editar
 * @param client 
 */
export const clientSelected = (client ) => ({
    type: types.clientSelected,
    payload: client
});

/**
 * accion para eliminar un cliente
 */
export const clientDelete = (idClient ) => ({
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
export const createClient = (client) => ({
    type: types.createClient,
    payload: client
});

/**
 * Accion para almacenar un cliente
 */
export const updateClient = (client) => ({
    type: types.updateClient,
    payload: client
});