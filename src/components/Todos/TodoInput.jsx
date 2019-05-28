import React from 'react';
import { Input, Icon } from 'antd';
import axios from '../../config/axios';
import { connect } from 'react-redux';
import {addTodo} from '../../Redux/actions'
import './TodoInput.scss'

class TodoInput extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			description: ''
		}
	}
	keyenter(e) {
		if (e.keyCode === 13 && this.state.description !== "") {
			this.postTodo()
		}
	}
	postTodo = async () => {
		try {
			const response = await axios.post('todos', { description: this.state.description })
			this.props.addTodo(response.data.resource)
		} catch (e) {
			throw new Error(e)
		}
		this.setState({ description: '' })
	}
	render() {
		return (
			<div className="todoInput">
				<Input suffix={<Icon type="enter" onClick={this.postTodo.bind(this)} 
					style={{ color: 'rgba(0,0,0,.25)' }} />}
					placeholder="添加新任务" onChange={(e) => this.setState({ description: e.target.value })}
					onKeyUp={this.keyenter.bind(this)} value={this.state.description}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	...ownProps
})

const mapDispatchToProps = {
	addTodo
}
export default connect(mapStateToProps,mapDispatchToProps)(TodoInput);