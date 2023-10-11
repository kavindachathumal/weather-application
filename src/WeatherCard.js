import React, { useState } from 'react';
import { Card, Row, Col } from 'antd';
import WeatherModal from './WeatherModal';

const WeatherCard = ({ city }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCardClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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

  const capitalizeFirstLetter = (str) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };  

  return (
    <div>
      <Card onClick={handleCardClick} hoverable className="cardStyle">
        <div>
            <Row justify="space-between"  className='headerStyle'>
                <Col span={12}>
                    <h2>{city.name}, {city.sys.country}</h2>
                    <p>{formattedDate(city.dt)}</p>
                    <div class="row">
                        <img alt="icon" src={`http://openweathermap.org/img/w/${city.weather[0].icon}.png`} />
                        <p>{capitalizeFirstLetter(city.weather[0].description)}</p>
                    </div>
                </Col>
                <Col span={12}>
                    <h1>{Math.round(city.main.temp)} °C</h1>
                    <p>Temp Min: {Math.round(city.main.temp_min)} °C</p>
                    <p>Temp Max: {Math.round(city.main.temp_max)} °C</p>
                </Col>
            </Row>
        </div>
        <div className='contentStyle'>
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
      </Card>
      <WeatherModal city={city} visible={modalVisible} onClose={closeModal} />
    </div>
  );
};

export default WeatherCard;