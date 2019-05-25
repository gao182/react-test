import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Icon, Button, Alert } from 'antd';
import axios from '../../config/axios';
import imgurl from '../../logo200.png'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: "",
      password: "",
      error: false
    }
  }
  onChange(key, value) {
    const newState = {}
    newState[key] = value
    this.setState(newState)
  }
  async login() {
    const { user, password } = this.state;
    if (user === "" || password === "") {
      this.errorAlert()
      return;
    }
    try {
      await axios.post('sign_in/user', {
        account: user,
        password
      })
      this.props.history.push('/')
    } catch (e) {
      if (e.response.status === 422) {
        this.errorAlert()
        return;
      }
      throw new Error(e)
    }
  }
  errorAlert = () => {
    this.setState({ error: true })
    setTimeout(() => this.setState({ error: false }), 2000)
  }
  render() {
    return (
      <div id="login" >
        <div className="logo">
          <img src={imgurl} alt="logo" />
        </div>
        <h1>番茄闹钟，科学管理时间工具</h1>
        <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="请输入用户名" onChange={(e) => this.onChange('user', e.target.value)} ref="userInput"
        />
        <Input.Password size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="请输入密码" onChange={(e) => this.onChange('password', e.target.value)}
        />
        <Button type="primary" size="large" onClick={this.login.bind(this)}>登录</Button>
        <p>没有账号？<Link to="/register">注册</Link></p>
        {this.state.error ? <Alert message="请输入正确用户名或密码" type="error" showIcon /> : ""}
      </div>
    )
  }
}

export default Login;
