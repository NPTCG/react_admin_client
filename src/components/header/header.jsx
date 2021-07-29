import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './header.less'
import axios from 'axios'
import dateInfo from '../../utils/dateUntils'

export default class Header extends Component {

  state = {
    nowTime: '',
    weather: '',
    weatherImg: '',
    winddirection: '',
    name: ''
  }
  //获取当前天气
  getWeather = async () => {
    const { data: res } = await axios.get('https://restapi.amap.com/v3/weather/weatherInfo?parameters', {
      params: {
        city: '510116',
        key: '92a562e86ee6a04873890496611e9e52',
        extensions: 'base',
        output: 'JSON'
      }
    })
    if (res.status !== '1') return
    let { weatherImg } = this.state
    switch (res.lives[0].weather) {
      case '晴':
        weatherImg = 'qing';
        break;
      case '多云':
        weatherImg = 'duoyun';
        break;
      case '阴':
        weatherImg = 'yin';
        break;
      case '小雨':
        weatherImg = 'xiaoyu';
        break;
      case '大雨':
        weatherImg = 'dayu';
        break;
      case '暴雨':
        weatherImg = 'baoyu';
        break;
      default:
    }
    this.setState({
      weather: res.lives[0].weather,
      winddirection: res.lives[0].winddirection,
      weatherImg
    })
  }
  //获取当前时间
  getTime = () => {
    const nowTime = dateInfo(Date.parse(new Date()))
    this.setState({ nowTime })
  }
  //退出
  esc = () => {
    window.localStorage.removeItem('userInfo')
  }
  //挂载后
  componentDidMount() {
    //挂载后获取当前天气
    this.getWeather()
    //挂载后获取当前时间
    this.getTime()
    //实时获取当前时间
    this.getNowTime = setInterval(() => {
      this.getTime()
    }, 1000)
    //获取用户信息
    const { role } = JSON.parse(window.localStorage.getItem('userInfo') || '{}')
    if (!role) return
    this.setState({ name: role.name })
  }
  //卸载前  
  componentWillUnmount() {
    //清除实时获取时间定时器
    clearInterval(this.getNowTime)
  }

  render() {

    const { nowTime, weather, winddirection, weatherImg, name } = this.state

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{name}</span>
          <Link to='/login' onClick={this.esc}>退出</Link>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">首页</div>
          <div className="header-bottom-right">
            <span>{nowTime}</span>
            <img src={`http://api.map.baidu.com/images/weather/day/${weatherImg}.png`} alt="weather" />
            <span>{weather}</span>
            <span>{winddirection}风</span>
          </div>
        </div>
      </div>
    )
  }
}
