import React from 'react';
import axios from '../../config/axios';
import { connect } from 'react-redux';
import {format} from 'date-fns';
import { initTomatoes, addTomato,updateTomato } from '../../Redux/actions'
import TomatoClock from './TomatoClock'
import TodayList from './TodayList'

import './Tomato.scss'

class Tomato extends React.Component {
	async componentDidMount() {
		try {
			const response = await axios.get('tomatoes')
			this.props.initTomatoes(response.data.resources)
		} catch (e) {
			throw new Error(e)
		}
	}
	get todayTomato() {
		const today = format(new Date(),'YYYY-MM-DD')
		return this.props.tomatoes.filter(t => format(t.created_at,'YYYY-MM-DD').search(today) === 0)
	}
	get unfinishedTomato() {
		return this.props.tomatoes.filter(t => !t.description && !t.ended_at && !t.aborted)[0]
	}
	startClock = async () => {
		try {
			const response = await axios.post('tomatoes', { duration: 1000 * 60 * 5 })
			this.props.addTomato(response.data.resource)
		} catch (e) {
			throw new Error(e)
		}
	}
	render() {
		return (
			<div className="tomato">
				<TomatoClock startClock={this.startClock} unfinishedTomato={this.unfinishedTomato} updateTomato={this.props.updateTomato} />
				<div className="today-plan">
					<h2>今日番茄</h2>
					<TodayList todayTomato={this.todayTomato} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	tomatoes: state.tomatoes,
	...ownProps
})

const mapDispatchToProps = {
	initTomatoes,
	addTomato,
	updateTomato
}
export default connect(mapStateToProps, mapDispatchToProps)(Tomato);