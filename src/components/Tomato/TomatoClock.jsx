import React from 'react';
import { Modal } from 'antd';
import axios from '../../config/axios';
import Countdown from './Countdown'

const confirm = Modal.confirm;

class TomatoClock extends React.Component {

    compolentConfirm = () => {
        var confirm = prompt("请输入你刚刚完成的任务", "");
        if (confirm !== null && confirm !== "") {
            this.updateTomato({
                description: confirm,
                ended_at: new Date()
            })
        }
    }

    abortConfirm = () => {
        confirm({
            title: '你确定要放弃这个番茄吗？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                this.abortTomato()
            }
        });
    }

    abortTomato = () => {
        this.updateTomato({ aborted: true })
        document.title = '番茄闹钟';
    }

    updateTomato = async (params) => {
        try {
            const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`, params)
            this.props.updateTomato(response.data.resource)
        } catch (e) {
            throw new Error(e)
        }
    }

    render() {
        let html = (<div></div>)
        if (this.props.unfinishedTomato === undefined) {
            html = (
                <button className="clock-btn btn-danger" onClick={this.props.startClock}>开始番茄</button>
            )
        } else {
            const startedAt = Date.parse(this.props.unfinishedTomato.started_at)
            const duration = this.props.unfinishedTomato.duration
            const timeNow = new Date().getTime()

            if (timeNow - startedAt > duration) {
                html = (
                    <button className="clock-btn btn-danger" onClick={this.compolentConfirm}>
                        <span>收割番茄</span>
                    </button>
                )
            } else if (timeNow - startedAt < duration) {
                const timer = duration - timeNow + startedAt
                html = (
                    <button className="clock-btn btn-warning" onClick={this.abortConfirm}>
                        <span>放弃</span>
                        <Countdown timer={timer} duration={duration}/>
                    </button>
                )
            }
        }

        return (
            <div className="clock">
                {html}
            </div>
        )
    }
}
export default TomatoClock