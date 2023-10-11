import React, { useState, useEffect } from 'react';
import { Spin, Row, Col } from 'antd';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import WeatherCard from './WeatherCard';

const API_KEY = '5ea488cd73965848e6237ca7edf095a4';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  <BrowserRouter>
    <Route path="/" exact component={WeatherCard} />
  </BrowserRouter>

  useEffect(() => {
    // Fetch weather data from openweathermap.org
    const fetchWeatherData = async () => {
      try {
        const cityCodes = ['1248991', '1850147', '2644210', '2988507', '2147714', '4930956', '1796236', '3143244'];
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/group?id=${cityCodes.join(',')}&units=metric&appid=${API_KEY}`
        );

        if (response.ok) {
          const data = await response.json();
          setWeatherData(data.list);
        } else {
          console.error('Error fetching weather data');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="App">
      <div class="row">
        <img src="/images/daytime.png" alt="Weather App" />
        <h2>Weather App</h2>
      </div>

      <main>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Row gutter={[16, 16]}>
            {weatherData.map((city) => (
              <Col span={12} key={city.id}>
                <WeatherCard city={city} />
              </Col>
            ))}
          </Row>
        )}
      </main>
      <footer className='footer'>
      2021 Fidenz Technologies
    </footer>
    </div>
  );
}

export default App;