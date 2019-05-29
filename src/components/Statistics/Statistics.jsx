import React from 'react';
import { InputNumber } from 'antd';
import { format } from 'date-fns';
import { connect } from 'react-redux'
import StatisticsTodos from './StatisticsTodos'
import StatisticsTomatoes from './StatisticsTomatoes'

import './Statistics.scss'

class Statistics extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            year: "",
            month: "",
            newyear: "",
            newmonth: "",
            showTomato: true
        }
    }

    componentWillMount() {
        const time = new Date()
        this.setState({
            year: time.getFullYear(),
            month: time.getMonth() + 1,
            newyear: time.getFullYear(),
            newmonth: time.getMonth() + 1
        })
    }

    get monthTodos() {
        const time = this.state.year + '-' + this.state.month
        return this.props.todos.filter(t => format(t.updated_at, 'YYYY-M').search(time) === 0)
    }

    get lastmonthTodos() {
        let time = ""
        if (this.state.month === 1)
            time = (this.state.year - 1) + '-' + 12
        else
            time = this.state.year + '-' + (this.state.month - 1)
        return this.props.todos.filter(t => format(t.updated_at, 'YYYY-M').search(time) === 0)
    }

    get monthTomatoes() {
        const time = this.state.year + '-' + this.state.month
        return this.props.tomatoes.filter(t => format(t.created_at, 'YYYY-M').search(time) === 0)
    }

    get lastmonthTomatoes() {
        let time = ""
        if (this.state.month === 1)
            time = (this.state.year - 1) + '-' + 12
        else
            time = this.state.year + '-' + (this.state.month - 1)
        return this.props.tomatoes.filter(t => format(t.created_at, 'YYYY-M').search(time) === 0)
    }

    get abortedTomatoes() {
        return this.monthTomatoes.filter(t => t.aborted)
    }

    get completedTomatoes() {
        return this.monthTomatoes.filter(t => t.ended_at && !t.aborted)
    }

    get lastcompletedTomatoes() {
        return this.lastmonthTomatoes.filter(t => t.ended_at && !t.aborted)
    }

    get deletedTodos() {
        return this.monthTodos.filter(t => t.deleted)
    }

    get completedTodos() {
        return this.monthTodos.filter(t => t.completed && !t.deleted)
    }

    get lastcompletedTodos() {
        return this.lastmonthTodos.filter(t => t.completed && !t.deleted)
    }

    render() {
        let tomatoesrate = this.completedTomatoes.length / this.monthTomatoes.length * 100
        let todosrate = this.completedTodos.length / this.monthTodos.length * 100
        return (
            <div className="statistics">
                <div className="time">
                    <h2 className="title">概况</h2>
                    <h4>{this.state.year}-{this.state.month}</h4>
                    <div className="search-time">
                        <span>查询年月：</span>
                        <InputNumber min={1999} max={2040} defaultValue={this.state.year} className="year"
                            onChange={(e) => this.setState({ newyear: e })} />
                        <InputNumber min={1} max={12} defaultValue={this.state.month} className="month"
                            onChange={(e) => this.setState({ newmonth: e })} />
                        <button onClick={() => this.setState({
                            year: this.state.newyear,
                            month: this.state.newmonth
                        })}>查询</button>
                    </div>
                </div>

                <div className="statistics-table">
                    <div className={this.state.showTomato ? "foucs" : ""} onClick={() => this.setState({ showTomato: true })}>
                        <p>当月番茄统计</p>
                        <div className="count">
                            总数<h1>{this.monthTomatoes.length}</h1>
                            完成数<h1>{this.completedTomatoes.length}</h1>
                            完成率<h1>{tomatoesrate > 0 ? tomatoesrate.toFixed(2) + '%' : '00.00%'}</h1>
                        </div>
                        <p>
                            上月总数：<span>{this.lastmonthTomatoes.length}</span>
                            上月完成数：<span>{this.lastcompletedTomatoes.length}</span>
                        </p>
                    </div>
                    <div className={this.state.showTomato ? "" : "foucs"} onClick={() => this.setState({ showTomato: false })}>
                        <p>当月任务统计</p>
                        <div className="count">
                            总数<h1>{this.monthTodos.length}</h1>
                            完成数<h1>{this.completedTodos.length}</h1>
                            完成率<h1>{todosrate > 0 ? todosrate.toFixed(2) + '%' : '00.00%'}</h1>
                        </div>
                        <p>
                            上月总数：<span>{this.lastmonthTodos.length}</span>
                            上月完成数：<span>{this.lastcompletedTodos.length}</span>
                        </p>
                    </div>
                </div>
                {
                    this.state.showTomato ?
                    <StatisticsTomatoes abortedTomatoes={this.abortedTomatoes}
                        completedTomatoes={this.completedTomatoes} /> :
                    <StatisticsTodos completedTodos={this.completedTodos}
                        deletedTodos={this.deletedTodos} />
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    todos: state.todos,
    tomatoes: state.tomatoes,
    ...ownProps
})

export default connect(mapStateToProps)(Statistics)