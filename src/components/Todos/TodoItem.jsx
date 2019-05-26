import React from 'react';
import axios from '../../config/axios';
import { Checkbox, Icon } from 'antd';
import { connect } from 'react-redux';
import { editTodo, updateTodo } from '../Redux/actions'

class TodoItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			editText: this.props.description
		}
	}

	updateTodo = async (params) => {
		try {
			const response = await axios.put(`todos/${this.props.id}`, params)
			this.props.updateTodo(response.data.resource)
		} catch (e) {
			throw new Error(e)
		}
	}

	editTodo = () => {
		this.props.editTodo(this.props.id)
	}

	keyenter = (e) => {
		if (e.keyCode === 13 && this.state.editText !== '') {
			this.updateTodo({ description: this.state.editText })
		}
	}

	render() {
		const Text = (
			<div className="textbox">
				<span>{this.props.description}</span>
				<div className="todoicon">
					<Icon type="edit" theme="filled" onClick={this.editTodo} />
					<Icon onClick={e => this.updateTodo({ deleted: true })} type="delete" theme="filled" />
				</div>
			</div>
		)
		const Edit = (
			<div className="inputbox">
				<input type="text" value={this.state.editText} onKeyUp={this.keyenter}
					onChange={e => this.setState({ editText: e.target.value })} />
				<Icon type="enter" onClick={e => this.updateTodo({ description: this.state.editText })} />
			</div>
		)
		return (
			<div className={this.props.editing? "focus":""}>
				<Checkbox checked={this.props.completed}
					onChange={e => this.updateTodo({ completed: e.target.checked })} />
				{this.props.editing ? Edit : Text}
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	...ownProps
})

const mapDispatchToProps = {
	editTodo,
	updateTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);