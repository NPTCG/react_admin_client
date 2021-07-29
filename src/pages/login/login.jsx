import React, { Component } from 'react'
import './login.less'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import axios from 'axios'

/* 登陆 */

export default class Login extends Component {


  //登陆
  onFinish = async (e) => {
    const { data: res } = await axios.post('/login', e)
    if (res.status !== 0) return message.error('登陆失败')
    message.success('登陆成功')
    window.localStorage.setItem('userInfo', JSON.stringify(res.data))
    this.props.history.replace('/')
  }
  render() {
    return (
      <div className="login">
        <section className="login-content">
          <h2>用户登陆</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              //声明式验证
              rules={[
                { required: true, message: '请输入用户名' },
                { min: 4, message: '用户名至少4位' },
                { max: 12, message: '用户名最多12位' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: '密码必须输入' },
                { min: 4, message: '密码至少4位' },
                { max: 12, message: '密码最多12位' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成' }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}


