import React from "react";
import { findDayName, formatTemp } from "../functionHelper";

interface MyProps {
  forecastData: any;
  tempType: number;
}

export class DailyForecast extends React.Component<MyProps> {
  getTemperature = (temperature: number) => {
    return formatTemp(this.props.tempType, Number(temperature)) + "°";
  };

  render() {
    const source = `https://www.metaweather.com/static/img/weather/${this.props.forecastData.weather_state_abbr}.svg`;
    const alt = this.props.forecastData.weather_state_name;
    const date = new Date(this.props.forecastData.applicable_date);
    const dayName = findDayName(date.getDay());
    return (
      <div className="dailyForecastContainer">
        <div className="header">
          <span>{dayName}</span>
        </div>

        <div className="body">
          <div>
            <img src={source} alt={alt} />
          </div>
          <div className="temperatureContainer">
            <span className="maxTemp">
              {this.getTemperature(Number(this.props.forecastData.max_temp))}
            </span>
            <span className="minTemp">
              {this.getTemperature(Number(this.props.forecastData.min_temp))}
            </span>
          </div>
        </div>

        <div className="humidity">
          <span>{`Humidity `}</span>
          <span className="value">{this.props.forecastData.humidity}</span>
        </div>
      </div>
    );
  }
}
