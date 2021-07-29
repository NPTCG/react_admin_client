import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './left-nav.less'
import menuList from '../../config/menuConfig'

import { Menu } from 'antd';
import * as Icons from '@ant-design/icons';

const { SubMenu } = Menu;

class LeftNav extends Component {

  //图标动态渲染函数
  getIcon = (icon) => {
    return React.createElement(Icons[icon])
  }

  getMenuList = (menuList) => {
    //得到当前路由路径
    const path = this.props.location.pathname
    return menuList.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={this.getIcon(item.icon)}>
            <Link to={item.key}>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        //获取要自动展开的路径名
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          this.openKey = item.key
        }

        return (
          <SubMenu key={item.key} title={item.title} icon={this.getIcon(item.icon)}>
            {this.getMenuList(item.children)}
          </SubMenu>
        )
      }
    })
  }

  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuList(menuList)
  }


  render() {
    //默认导航栏激活，得到当前路由路径
    const path = this.props.location.pathname
    //获取要展开的项
    const openKey = this.openKey

    return (
      <div className="left-nav" style={{ height: "100%" }}>
        <Link to="/" className="left-nav-header">
          <h1>REACT</h1>
        </Link>
        <Menu
          onClick={this.handleClick}
          style={{ width: 200, height: "100%" }}
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >

          {/* <Menu.Item>首页</Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
            <Menu.Item key="1">品类管理</Menu.Item>
            <Menu.Item key="2">商品管理</Menu.Item>
          </SubMenu> */}
          {this.menuNodes}
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav)
