import React from 'react';
import lodash from 'lodash'
import axios from '../../config/axios';
import { connect } from 'react-redux'
import { updateTomato } from '../../Redux/actions';
import { Tabs, Collapse } from 'antd';
import { format } from 'date-fns';

import './StatisticsList.scss'

const ListItem = function (data) {
    return (
        <div>
            <span>{format(data.created_at, 'HH:mm')}
                {data.ended_at ? ' - ' + format(data.ended_at, 'HH:mm') : ""}</span>
            <b>{data.description ? data.description : "创建番茄,被中断"}</b>

            {data.aborted && data.ended_at ? <div className="action">
                    <span onClick={() => data.updateTomato(data.id, { aborted: false })}>恢复</span>
                </div> :
                <div className="action">
                    <span onClick={() => data.updateTomato(data.id, { aborted: true })}>删除</span>
                </div>}
        </div>
    )
}

class StatisticsTomatoes extends React.Component {

    updateTomato = async (id, params) => {
        try {
            const response = await axios.put(`tomatoes/${id}`, params)
            this.props.updateTomato(response.data.resource)
            this.forceUpdate()
        } catch (e) {
            throw new Error(e)
        }
    }

    get groupAbortedTomatoes() {
        return lodash.groupBy(this.props.abortedTomatoes, (t) => {
            return format(t.created_at, 'YYYY-MM-DD')
        })
    }

    get abortedTomatoesKeys() {
        return Object.keys(this.groupAbortedTomatoes).sort((a, b) => Date.parse(b) - Date.parse(a))
    }

    get groupCompletedTomatoes() {
        return lodash.groupBy(this.props.completedTomatoes, (t) => {
            return format(t.created_at, 'YYYY-MM-DD')
        })
    }

    get completedTomatoesKeys() {
        return Object.keys(this.groupCompletedTomatoes).sort((a, b) => Date.parse(b) - Date.parse(a))
    }

    render() {
        const tomatoesMonthCompleted = this.completedTomatoesKeys.map((data, idx) => {
            return (
                <Collapse.Panel className="month-list" header={data} key={idx + 1}>
                    <div className="list-item">
                        {this.groupCompletedTomatoes[data].map(t => 
                        <ListItem updateTomato={this.updateTomato} key={t.id} {...t} />)}
                    </div>
                </Collapse.Panel>
            )
        })

        const tomatoesMonthAborted = this.abortedTomatoesKeys.map((data, idx) => {
            return (
                <Collapse.Panel className="month-list" header={data} key={idx + 1}>
                    <div className="list-item">
                        {this.groupAbortedTomatoes[data].map(t => 
                        <ListItem updateTomato={this.updateTomato} key={t.id} {...t} />)}
                    </div>
                </Collapse.Panel>
            )
        })

        return (
            <div className="statisticslist">
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="已完成的番茄" key="1">
                        <Collapse bordered={false} defaultActiveKey={['1']}>
                            {
                                tomatoesMonthCompleted
                            }
                        </Collapse>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="已放弃的番茄" key="2">
                        <Collapse bordered={false} defaultActiveKey={['1']}>
                            {
                                tomatoesMonthAborted
                            }
                        </Collapse>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    tomatoes: state.tomatoes,
    ...ownProps
})

const mapDispatchToProps = {
    updateTomato
}
export default connect(mapStateToProps, mapDispatchToProps)(StatisticsTomatoes);