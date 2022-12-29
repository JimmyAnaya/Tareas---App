import tareaStore, { Filters } from "../../store/tarea.store";

let element
/**
 * @param {String} elementId
 */

export const renderPending = ( elementId ) => {
    if (!element) {
        element = document.querySelector(elementId);
    }

    if (!element) {
        throw new Error(`Element ${ elementId } not found`);
    }

    element.innerHTML = tareaStore.getTasks( Filters.Pending ).length;
}