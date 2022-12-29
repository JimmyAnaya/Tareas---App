import tareaStore, { Filters } from '../store/tarea.store';
import  html  from './app.html?raw';
import { renderTareas, renderPending } from './use-cases';

const ElementId = {
    DeleteCompleteButton: '.clear-completed',
    NewTareaInput: '#new-todo-input',
    TaksList: '.todo-list',
    TareaFilters: '.filtro',
    PendingCount: '#pending-count',
}

/**
 * @param {String} elementId
 */
export const App = (elementId) => {

    const displayTareas = () => {
        const tareas = tareaStore.getTasks( tareaStore.getCurrentFilter());
        renderTareas( ElementId.TaksList, tareas );
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(ElementId.PendingCount);
    }

    (() => {
        const app = document.createElement('div');
        app.innerHTML =  html;
        document.querySelector(elementId).append( app );
        displayTareas();
    })();

    //Referencias HTML
    const newDescriptionInput   = document.querySelector( ElementId.NewTareaInput );
    const taskListUl            = document.querySelector( ElementId.TaksList);
    const clearCompleteButton   = document.querySelector( ElementId.DeleteCompleteButton);
    const filtersLi             = document.querySelectorAll( ElementId.TareaFilters);

    //Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        if ( event.keyCode !== 13) { return; }
        if ( event.target.value.trim().length === 0) { return; }

        tareaStore.addTask( event.target.value);
        displayTareas();
        event.target.value = '';
    });

    taskListUl.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        tareaStore.toggleTask( element.getAttribute('data-id') );
        displayTareas();
    });

    taskListUl.addEventListener('click', (event) =>{
        const deleteButton = event.target.className;
        if (deleteButton == 'destroy') {
            const element = event.target.closest('[data-id]');
            tareaStore.deleteTask(element.getAttribute('data-id'));
            displayTareas();
        }
    });

    clearCompleteButton.addEventListener('click', () => {
        tareaStore.deleteCompleted();
        displayTareas();
    });

    filtersLi.forEach( element => {
        element.addEventListener('click', (element)  => {
            filtersLi.forEach( item => item.classList.remove('selected'));
            element.target.classList.add('selected');
            
            switch ( element.target.id ) {
                case 'Todos':
                    tareaStore.setFilter( Filters.All);
                    break;
                case 'Pendientes':
                    tareaStore.setFilter( Filters.Pending);
                    break;
                case 'Completados':
                    tareaStore.setFilter( Filters.Completed);
                    break;
            }
            displayTareas();
        })
    }) 
}