import React from 'react';
import { InputNumber } from 'antd';
import StatisticsList from '../Tomato/StatisticsList'

import './Statistics.scss'

class Statistics extends React.Component {
    render() {
        return (
            <div className="statistics">
                <div className="time">
                    <h2 className="title">概况</h2>
                    <h4>2019-5</h4>
                    <div className="search-time">
                    <span>查询年月：</span>
                    <InputNumber min={1999} max={2040} defaultValue={2019} className="year" />
                    <InputNumber min={1} max={12} defaultValue={5} className="mount" />
                    <button>查询</button>
                    </div>
                </div>
                
                <div className="statistics-table">
                    <div className="mount-tomato foucs">
                        <p>当月番茄统计</p>
                        <div className="count">
                            总数<h1>2</h1>
                            完成数<h1>1</h1>
                            完成率<h1>50.00%</h1>
                        </div>
                        <p>上月：<span>0</span></p>
                    </div>
                    <div className="mount-works">
                        <p>当月任务统计</p>
                        <div className="count">
                            总数<h1>2</h1>
                            完成数<h1>1</h1>
                            完成率<h1>50.00%</h1>
                        </div>
                        <p>上月：<span>0</span></p>
                    </div>
                </div>
                <StatisticsList/>
            </div>
        )
    }
}

export default Statistics