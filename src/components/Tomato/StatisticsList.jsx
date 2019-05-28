import React from 'react';
import { Tabs } from 'antd';

import './StatisticsList.scss'

class StatisticsList extends React.Component {
    render() {
        return (
            <div className="statisticslist">
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="完成番茄" key="1">
                        <div className="tomato-month">
                            2019-5-21
                            <div className="list-item">
                                <div>
                                    <span>09:23-10:20</span>
                                    <b>写代码</b>
                                </div>
                                <div>
                                    <span>09:23-10:20</span>
                                    <b>写代码</b>
                                </div>
                            </div>
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="放弃番茄" key="2">
                        <div className="tomato-month">
                            2019-5-21
                            <div className="list-item">
                                <div>
                                    <span>09:23-10:20</span>
                                    <b>写代码</b>
                                </div>
                                <div>
                                    <span>09:23-10:20</span>
                                    <b>写代码</b>
                                </div>
                            </div>
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }
}

export default StatisticsList