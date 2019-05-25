import React from 'react';
import axios from '../../config/axios'
import './Todos.scss'

class Todos extends React.Component {
	constructor(props) {
		super(props)
		this.state = { todos: [] }
	}
	async componentDidMount() {
		try {
			const response = await axios.get('todos')
			const todos = response.data.resources
			console.log(todos)
			this.setState({ todos: todos })
		} catch (e) {
			throw new Error(e)
		}
	}

	render() {
		return (
			<div className="todos">
				{
						this.state.todos.map(t => <div key={t.id} > {t.description} </div>)
				}
			</div>
		)
	}
}

export default Todos