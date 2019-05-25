import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Icon, Button, Alert } from 'antd';
import axios from '../../config/axios'
import imgurl from '../../logo200.png'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: "",
      password: "",
      passwordconfirm: "",
      error: false
    }
  }
  onChange(key, value) {
    const newState = {}
    newState[key] = value
    this.setState(newState)
  }
  async register() {
    const { user, password, passwordconfirm } = this.state;
    if (user === "" || password === "" || passwordconfirm === "") {
      this.errorAlert()
      return;
    }
    else if (password !== passwordconfirm) {
      this.errorAlert()
      return;
    }
    try {
      await axios.post('sign_up/user', {
        account: user,
        password,
        password_confirmation: passwordconfirm
      })
      this.props.history.push('/')
    } catch (e) {
      throw new Error(e)
    }
  }
  errorAlert = () => {
    this.setState({ error: true })
    setTimeout(() => this.setState({ error: false }), 2000)
  }
  render() {
    return (
      <div id="register" >
        <div className="logo">
          <img src={imgurl} alt="logo" />
        </div>
        <h1>番茄闹钟，科学管理时间工具</h1>
        <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="请输入用户名" onChange={(e) => this.onChange('user', e.target.value)}
        />
        <Input.Password size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="请输入密码" onChange={(e) => this.onChange('password', e.target.value)}
        />
        <Input.Password size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="请确认密码" onChange={(e) => this.onChange('passwordconfirm', e.target.value)}
        />
        <Button type="primary" size="large" onClick={this.register.bind(this)}>注册</Button>
        <p>已有账号？<Link to="/login">登录</Link></p>
        {this.state.error ? <Alert message="请输入正确用户名或密码" type="error" showIcon /> : ""}
      </div>
    )
  }
}

export default Register;
