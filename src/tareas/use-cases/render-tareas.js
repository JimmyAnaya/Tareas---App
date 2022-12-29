import { Tarea } from "../models/tarea.model";
import { createTodoHtml } from "./create-tarea-html";

let element;

/**
 * 
 * @param {String} elemetId 
 * @param {Tarea} tareas 
 */
export const renderTareas = ( elementId, tareas = [] ) => {
    
    //TODO: referencia
    if ( !element ) {
        element = document.querySelector( elementId)
    }

    if ( !element ) {
        throw new Error(`Element ${ elementId } not found.`)
    }

    element.innerHTML = '';
    /* const element = document.querySelector( elementId ); */

    tareas.forEach( tarea => {
        element.append( createTodoHtml(tarea));
    });

}