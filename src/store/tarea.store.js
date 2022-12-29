import { Tarea } from "../tareas/models/tarea.model";

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    tareas: [
        new Tarea('Nunca parar de aprender'),
        new Tarea('Sonreir'),
        new Tarea('Meditar'),
        new Tarea('Ejercitarse'),
        new Tarea('Leer un libro')
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
}

const loadStore = () => {
    if (!localStorage.getItem('state')) {
        return;
    }else{
        const { tareas = [], filter = Filters.All } =  JSON.parse( localStorage.getItem('state'));
        state.tareas = tareas;
        state.filter = filter; 
    }
}

const saveStateToLocalStorage = () => {
    localStorage.setItem( 'state', JSON.stringify(state));
}

const getTasks = ( filter = Filters.All ) => {
    
    switch ( filter ) {
        case Filters.All:
            return [...state.tareas];
        
        case Filters.Completed:
            return state.tareas.filter( tarea => tarea.done );

        case Filters.Pending:
            return state.tareas.filter( tarea => !tarea.done );

        default:
            throw new Error(`Option $ { filter } is not valid.`)
    }
}

/**
 * @param {String} description
 */
const addTask = (description) => {
    if (!description) {
        throw new Error('Description in required');
    }else{
        state.tareas.push( new Tarea(description) );
    }
    saveStateToLocalStorage();
}

/**
 * @param {String} taskId
 */
const toggleTask = (taskId) => {
    state.tareas = state.tareas.map( tarea => {
        if (tarea.id === taskId) {
            tarea.done = !tarea.done;
        }
        return tarea;
    });
    saveStateToLocalStorage();
}

/**
 * @param {String} taskId
 */
const  deleteTask = (tareaId) => {
    state.tareas = state.tareas.filter( tarea => tarea.id !== tareaId);
    saveStateToLocalStorage();
}

const  deleteCompleted = () => {
    state.tareas = state.tareas.filter( tarea => !tarea.done);
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
}

const getCurrentFilter = () => {
    return state.filter;
}


export default {
    addTask,
    deleteCompleted,
    deleteTask,
    getCurrentFilter,
    getTasks,
    initStore,
    loadStore,
    setFilter,
    toggleTask,
}