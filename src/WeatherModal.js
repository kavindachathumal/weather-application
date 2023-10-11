import React from 'react';
import { Modal, Row, Col } from 'antd';

const formattedDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
  
    const time = date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  
    const monthDate = date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  
    return `${time}, ${monthDate}`;
  };

const WeatherModal = ({ city, visible, onClose }) => {
  return (
<Modal
  title={null}
  open={visible}
  onOk={onClose}
  onCancel={onClose}
  width={600}
  footer={null}
>
  <div style={{ color: 'white', backgroundColor:'#388ee7', padding:'10px' }}>
    <Row justify="center" style={{alignItems:'center'}}>
        <h2>{city.name}, {city.sys.country}</h2>
    </Row>
    <Row justify="center" style={{alignItems:'center'}}>
        <p>{formattedDate(city.dt)}</p>
    </Row>
    <Row justify="center" style={{alignItems:'center', paddingLeft:'10px'}}>
      <Col span={12} className="border-right">
        <img alt="icon" src={`http://openweathermap.org/img/w/${city.weather[0].icon}.png`} />
        <p>{city.weather[0].description}</p>
      </Col>
      <Col span={12}>
        <h1>{Math.round(city.main.temp)} °C</h1>
        <p>Temp Min: {Math.round(city.main.temp_min)} °C</p>
        <p>Temp Max: {Math.round(city.main.temp_max)} °C</p>
      </Col>
    </Row>
  </div>
  <div className='contentStyle' style={{backgroundColor:'#383b47'}}>
          <Row justify="space-between">
            <Col span={8} className="border-right">
              <p><b>Pressure:</b> {city.main.pressure}hPa</p>
              <p><b>Humidity:</b> {city.main.humidity}%</p>
              <p><b>Visibility:</b> {(city.visibility / 1000).toFixed(1)}km</p>
            </Col>
            <Col span={8} className="border-right">
                <div className="row">
                    <img alt="navigation" src='/images/compass.png' />
                </div>
                <p>{city.wind.speed}m/s {city.wind.deg} Degree</p>
            </Col>
            <Col span={8}>
                <p><b>Sun Rise:</b> {new Date(city.sys.sunrise * 1000).toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                    })}
                </p>
                <p><b>Sun Rise:</b> {new Date(city.sys.sunset * 1000).toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                    })}
                </p>
            </Col>
          </Row>
        </div>
</Modal>

  );
};

export default WeatherModal;