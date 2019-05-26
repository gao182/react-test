import { ADD_TODO, INIT_TODOS, UPDATE_TODO, EDIT_TODO } from './actionType'

export const addTodo = (payload) => {
	return {
		type: ADD_TODO,
		payload
	}
}

export const initTodos = (payload) => {
	return {
		type: INIT_TODOS,
		payload
	}
}

export const updateTodo = (payload) => {
	return {
		type: UPDATE_TODO,
		payload
	}
}

export const editTodo = (payload) => {
	return {
		type: EDIT_TODO,
		payload
	}
}