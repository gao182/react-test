import React from 'react';
import lodash from 'lodash'
import { Tabs, Collapse } from 'antd';
import axios from '../../config/axios';
import { connect } from 'react-redux'
import { updateTodo } from '../../Redux/actions';
import { format } from 'date-fns';

import './StatisticsList.scss'

const ListItem = function (data) {
    return (
        <div>
            <span>{format(data.updated_at, 'HH:mm')}</span>
            <b>{data.description ? data.description : "创建番茄,被中断"}</b>

            {data.deleted ? <div className="action">
                <span onClick={()=>data.updateTodo(data.id,{completed: false,deleted: false})}>恢复</span></div> :
                <div className="action">
                    <span onClick={()=>data.updateTodo(data.id,{completed: false})}>恢复</span>
                    <span  onClick={()=>data.updateTodo(data.id,{deleted: true})}>删除</span></div>}
        </div>
    )
}

class StatisticsTodos extends React.Component {

    updateTodo = async (id,params)=>{
        console.log(id,params)
		try{
			const response = await axios.put(`todos/${id}`,params)
            this.props.updateTodo(response.data.resource)
            this.forceUpdate()
		}catch (e) {
			throw new Error(e)
		}
	}

    get groupCompletedTodos() {
        return lodash.groupBy(this.props.completedTodos, (t) => {
            return format(t.updated_at, 'YYYY-MM-DD')
        })
    }

    get completedTodosKeys() {
        return Object.keys(this.groupCompletedTodos).sort((a, b) => Date.parse(b) - Date.parse(a))
    }

    get groupDeletedTodos() {
        return lodash.groupBy(this.props.deletedTodos, (t) => {
            return format(t.updated_at, 'YYYY-MM-DD')
        })
    }

    get deletedTodosKeys() {
        return Object.keys(this.groupDeletedTodos).sort((a, b) => Date.parse(b) - Date.parse(a))
    }

    render() {

        const todosMonthCompleted = this.completedTodosKeys.map((data, idx) => {
            return (
                <Collapse.Panel className="month-list" header={data} key={idx + 1}>
                    <div className="list-item">
                        {this.groupCompletedTodos[data].map(t => 
                        <ListItem key={t.id} {...t} updateTodo={this.updateTodo} />)}
                    </div>
                </Collapse.Panel>
            )
        })

        const todosMonthDelet = this.deletedTodosKeys.map((data, idx) => {
            return (
                <Collapse.Panel className="month-list" header={data} key={idx + 1}>
                    <div className="list-item">
                        {this.groupDeletedTodos[data].map(t => 
                        <ListItem updateTodo={this.updateTodo} key={t.id} {...t} />)}
                    </div>
                </Collapse.Panel>
            )
        })

        return (
            <div className="statisticslist">
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="已完成的任务" key="1">
                        <Collapse bordered={false} defaultActiveKey={['1']}>
                            {
                                todosMonthCompleted
                            }
                        </Collapse>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="已删除的任务" key="2">
                        <Collapse bordered={false} defaultActiveKey={['1']}>
                            {
                                todosMonthDelet
                            }
                        </Collapse>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
	...ownProps
})

const mapDispatchToProps = {
	updateTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsTodos);
