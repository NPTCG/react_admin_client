import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
//路由引入
import Category from '../category/category'
import Bar from '../chats/bar'
import Line from '../chats/line'
import Pie from '../chats/pie'
import Home from '../home/home'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Order from '../order/order'

import './admin.less'
import Header from '../../components/header/header'
import LeftNav from '../../components/left-nav/left-nav'
import { Layout } from 'antd';
const { Footer, Sider, Content } = Layout;




/* 管理系统 */
export default class Admin extends Component {
  render() {
    //取出session的user信息
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo') || '{}')
    console.log(userInfo);
    console.log(this.props);
    if (!userInfo._id) {
      return <Redirect to='/login' />
    }
    return (
      <Layout className="layout">
        <Sider style={{ backgroundColor: '#fff' }}><LeftNav /></Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ backgroundColor: "#fff", margin: "20px" }}>
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/category' component={Category} />
              <Route path='/user' component={User} />
              <Route path='/role' component={Role} />
              <Route path='/product' component={Product} />
              <Route path='/charts/bar' component={Bar} />
              <Route path='/charts/line' component={Line} />
              <Route path='/charts/pie' component={Pie} />
              <Route path='/order' component={Order} />
              <Redirect to='/home' />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "#ccc" }}>推荐使用谷歌浏览器</Footer>
        </Layout>
      </Layout>
    )
  }
}
