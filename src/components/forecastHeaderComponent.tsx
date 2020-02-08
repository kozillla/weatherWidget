import React from "react";
import {
  findDayName,
  findMonthName,
  formatDay,
  formatTemp
} from "../functionHelper";

interface MyProps {
  weatherData: any;
  tempType: number;
}

export class ForecastHeaderComponent extends React.Component<MyProps> {
  // return formated time as : Day Name, Month Name, Day number
  formatTime = () => {
    let time;
    let dayName, monthName, day;
    if (this.props.weatherData && this.props.weatherData.time) {
      time = new Date(this.props.weatherData.time);
      dayName = findDayName(time.getDay());
      monthName = findMonthName(time.getMonth());
      day = formatDay(time.getDate());
      return `${dayName}, ${monthName} ${day}`;
    }
  };

  render() {
    if (
      !this.props.weatherData ||
      !this.props.weatherData.time ||
      !this.props.weatherData.consolidated_weather
    ) {
      return <></>;
    }
    const formatedTime = this.formatTime();
    const source = `https://www.metaweather.com/static/img/weather/${this.props.weatherData.consolidated_weather[0].weather_state_abbr}.svg`;
    const alt = this.props.weatherData.consolidated_weather[0]
      .weather_state_name;
    const temperature = formatTemp(
      Number(this.props.tempType),
      this.props.weatherData.consolidated_weather[0].the_temp
    );
    const todayWeather = this.props.weatherData.consolidated_weather[0];
    const todayWind = Math.floor(todayWeather.wind_speed);
    const todayWindDirection = todayWeather.wind_direction_compass;
    const todayHumidity = todayWeather.humidity;
    const todayAirPreassure = todayWeather.air_pressure;
    const todayPredictability = todayWeather.predictability;

    return (
      <div className="forecastHeaderContainer">
        <span className="cityName">
          {this.props.weatherData && this.props.weatherData.title}
        </span>

        <div className="overcast">
          <span>{formatedTime}</span>
          <span>Overcast</span>
        </div>

        <div className="wrap">
          <div className="leftContent">
            <div className="imgWrap">
              <img src={source} alt={alt} />
            </div>
            <div className="temperatureWrap">
              <span>{temperature}</span>
              <span className="degree">
                {this.props.tempType === 1 ? <span>°C</span> : <span>°F</span>}
              </span>
            </div>
          </div>

          <div className="rightContent">
            {this.props.tempType === 1 ? (
              <span>{`Wind: ${todayWind} kph ${todayWindDirection}`}</span>
            ) : (
              <span>{`Wind: ${Math.floor(
                todayWind * 0.621371
              )} mph ${todayWindDirection}`}</span>
            )}
            <span>{`Humidity: ${todayHumidity}`}</span>
            <span>{`Air Pressure: ${todayAirPreassure}`}</span>
            <span>{`Predictability: ${todayPredictability}`}</span>
          </div>
        </div>
      </div>
    );
  }
}
