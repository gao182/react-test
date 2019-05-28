import React from 'react';

let timerId = 1;
class Countdown extends React.Component {
    constructor(props) {
        super(props)
		this.state = {
			countDown: this.props.timer
		}
    }

    get countTime(){
		const min = Math.floor(this.state.countDown/1000/60)
		const second = Math.floor(this.state.countDown/1000%60)
		return `${min<10?`0${min}`:min}:${second<10?`0${second}`:second}`
    }
    
    componentDidMount() {
        timerId = setInterval(() => {
            const time = this.state.countDown
			this.setState({countDown: time - 1000})
            document.title = `${this.countTime} - 番茄闹钟`;
            if (time < 1000) {
                document.title = '番茄闹钟';
                clearInterval(timerId)
            }
        }, 1000)
    }

    componentWillUnmount(){
		clearInterval(timerId)
    }
    
    render() {
        return (
            <div className="countdown">
                <span>{this.countTime}</span>
            </div>
        )
    }
}
export default Countdown