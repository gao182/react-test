import React from 'react';
import {format} from 'date-fns';

const TodayItem = function (props) {
	return (
		<div className="TomatoItem">
            <span>{format(props.started_at,'HH:mm')} - 
                {props.ended_at?format(props.ended_at,'HH:mm'):""}</span>
			<b>{props.description?props.description:"创建"}</b>
		</div>
	)
}

class TodayList extends React.Component {
	get todayUnaborted() {
		return this.props.todayTomato.filter(t => t.ended_at)
	}
	get todayAborted(){
		return this.props.todayTomato.filter(t => t.aborted === true)
	}
	render() {
		return (
            <table>
                <tbody>
                    <tr>
                        <th>完成番茄</th>
                        <th>放弃番茄</th>
                    </tr>
                    <tr>
                        <td className="complete">
                            {
                                this.todayUnaborted.length < 1 ? <div>今日没有番茄完成</div> :
                                    this.todayUnaborted.map(t => <TodayItem key={t.id} {...t} />)
                            }
                        </td>
                        <td>
                            {
                                this.todayAborted.length < 1 ? <div>今日没有番茄放弃</div> :
                                    this.todayAborted.map(t => <TodayItem key={t.id} {...t} />)
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
		)
	}
}

export default TodayList;