import React from 'react';
import { Button } from 'antd';
import axios from '../../config/axios'
import imgurl from '../../logo200.png'
import Todos from '../Todos/Todos'
import Tomato from '../Tomato/Tomato'
import Statistics from '../Statistics/Statistics'

import './Home.scss'

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {}
		}
	}
	async componentWillMount(){
		await this.getMe()
	}

	getMe = async () => {
		const response = await axios.get('me');
		this.setState({user: response.data})
	}

	logout() {
		this.props.history.push('/login')
		localStorage.setItem('x-token', '')
	}
	render() {
		return (
			<div className="home">
				<nav>
					<div id="logo">
						<img src={imgurl} alt="logo" />
						<h1>番茄闹钟</h1>
					</div>
					<div className="user">
						<span>{this.state.user.account}</span>
						<Button onClick={this.logout.bind(this)}>注销</Button>
					</div>
				</nav>
				<main>
					<div className="content">
						<Tomato/>
						<aside>
							<Todos/>
						</aside>
					</div>
					<Statistics/>
				</main>
			</div>
		)
	}
}

export default Home;