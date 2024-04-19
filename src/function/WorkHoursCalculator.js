
import React, { useState } from 'react';
import { Button, DatePicker, message, Table } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';
const { TimePicker } = DatePicker;

let timeFormat = 'HH:mm'

const WorkHoursCalculator = () => {
  const [startTime, setStartTime] = useState('');
  // const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [workHoursRecords, setWorkHoursRecords] = useState([]);
  const [totalHours, setTotalHours] = useState(0);

  // 时间变化时的处理函数  
  const handleTimeChange = (time, setType) => {
    console.log('time',time,)
    setType(time);
  };

  // 计算工作时长的方法  
  const calculateWorkHours = () => {
    if (!endTime || !startTime) {
      message.error('上班时间和下班时间不能为空!');
      return
    }
    if (endTime.isBefore(startTime) || !startTime.isValid() || !endTime.isValid()) {
      message.error('下班时间不能早于上班时间，请重新选择时间！');
      return;
    }
    const duration = moment.duration(endTime.diff(startTime));
    const hours = Math.floor(duration.asHours());
    const minutes = Math.round(duration.asMinutes() % 60);
    const workHours = truncateDecimalWithoutRounding((hours + (minutes / 60)) - 1)
    // 将本次计算的工作时长添加到记录数组中  
    const formattedDateStartTime = formatDate(startTime.$d).slice(-5); // 截取成 09:01 这种
    const formattedDateEndTime = formatDate(endTime.$d).slice(-5); // 截取成 18:00 这种

    console.log(formattedDateStartTime)
    const newRecord = {
      startTime: formattedDateStartTime,
      endTime: formattedDateEndTime,
      workHours,
      overtime: truncateDecimalWithoutRounding((workHours - 8))
    };
    setWorkHoursRecords([...workHoursRecords, newRecord]);

  };

  // 截取小数点后一位
  function truncateDecimalWithoutRounding(num) {
    const decimalPart = num.toString().split('.')[1];
    if (decimalPart) {
      return Number(`${Math.trunc(num)}.${decimalPart.charAt(0)}`);
    } else {
      return num; // 如果原本就是整数，不做处理
    }
  }

  function formatDate(dateStr) {
    // 假设 dateStr 是形如 "Fri Apr 12 2024 09:00:00 GMT+0800 (中国标准时间)" 的字符串  
    // 创建一个 Date 对象  
    var date = new Date(dateStr);

    // 获取年、月、日、时、分、秒  
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // getMonth() 返回的是 0-11，所以需要加 1  
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    // var seconds = date.getSeconds();

    // 格式化月份、日期、小时、分钟和秒（如果需要补零）  
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    // seconds = seconds < 10 ? '0' + seconds : seconds;

    // 拼接字符串得到最终结果  
    var formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
    return formattedDate;
  }

  // 计算总工作时长  
  const calculateALLWorkHours = () => {
    const sum = workHoursRecords.reduce((acc, val) => acc + val.workHours, 0);
    setTotalHours(truncateDecimalWithoutRounding(sum));
  }

  // 清空总工作时长记录  
  const clearWorkHoursRecords = () => {
    setStartTime(0)
    setEndTime(0)
    setWorkHoursRecords([]);
  }



  const columns = [
    {
      title: '上班时间',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: '下班时间',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: '当日工作时长(h)',
      dataIndex: 'workHours',
      key: 'workHours',
    },
    {
      title: '加班时长(h)',
      dataIndex: 'overtime',
      key: 'overtime',
    },
  ];

  return (
    <div>
      <span>上班时间:</span>
      <TimePicker
        value={startTime}
        style={{ width: '140px' }}
        // defaultValue={dayjs('09:00', timeFormat)}
        format={timeFormat}
        onChange={(time) => handleTimeChange(time, setStartTime)}
        placeholder="选择上班时间"
      />
      <span style={{ marginLeft: '10px' }}>下班班时间:</span>
      <TimePicker
        style={{ width: '140px' }}
        value={endTime}
        format={timeFormat}
        onChange={(time) => handleTimeChange(time, setEndTime)}
        placeholder="选择下班时间"
      />
      <Button type="primary" onClick={calculateWorkHours} style={{ marginLeft: '10px' }}>
        计算单日工作时长
      </Button>
      <Button type="primary" onClick={calculateALLWorkHours} style={{ margin: '0 10px' }}>
        计算总工作时长
      </Button>
      <Button type="primary" onClick={clearWorkHoursRecords}>
        清空所有数据
      </Button>
      <h3>总工作时长: {totalHours} 小时</h3>
      <Table columns={columns} dataSource={workHoursRecords} />
    </div>
  );
};

export default WorkHoursCalculator;
