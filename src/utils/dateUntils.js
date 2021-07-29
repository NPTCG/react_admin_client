//时间转换
const format = (value) => {
  let date = new Date(value);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let second = date.getSeconds();
  return y + '-' + m + '-' + d + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (second <
    10 ? '0' + second : second);
}
export default format