import React from 'react';
import axios from '../../config/axios';
import { Collapse } from 'antd';
import { connect } from 'react-redux';
import { initTodos, updateTodo } from '../../Redux/actions'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import './Todos.scss'

class Todos extends React.Component {
	get unDeletedTodos() {
		return this.props.todos.filter(t => !t.deleted)
	}

	get unCompletedTodos() {
		return this.unDeletedTodos.filter(t => !t.completed)
	}

	get completedTodos() {
		return this.unDeletedTodos.filter(t => t.completed)
	}

	componentDidMount() {
		this.getTodos()
	}

	getTodos = async () => {
		const response = await axios.get('todos')
		const todos = response.data.resources.map(t => Object.assign({}, t, { editing: false }))
		this.props.initTodos(todos)
	}

	render() {
		return (
			<div className="todos">
				<TodoInput />
				<Collapse accordion defaultActiveKey={['1']}>
					<Collapse.Panel header="未完成任务" key="1">
						
						{
							this.unCompletedTodos.map(t => <TodoItem key={t.id} {...t} />)
						}
					</Collapse.Panel>
					<Collapse.Panel header="最近完成任务" key="2">
						{
							this.completedTodos.map(t => <TodoItem key={t.id} {...t} />)
						}
					</Collapse.Panel>
				</Collapse>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	todos: state.todos,
	...ownProps
})

const mapDispatchToProps = {
	initTodos,
	updateTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
