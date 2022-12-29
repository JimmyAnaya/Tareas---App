import { Tarea } from "../models/tarea.model";

/**
 * 
 * @param {Tarea} tarea 
 */
export const createTodoHtml = (tarea) => {
    if (!tarea) {
        throw new Error('a tarea object is required');
    } else {

        const { done, description, id } = tarea;

        const html = `
            <div class="view">
                <input class="toggle" type="checkbox" ${ done ? 'checked' : ''}>
                <label>${ description }</label>
                <button class="destroy"></button>
            </div>
        `;
        const liElement = document.createElement('li');
        liElement.innerHTML = html;
        liElement.setAttribute('data-id', id);

        if (tarea.done) {
            liElement.classList.add('completed');
        }

        return liElement;
    }
}