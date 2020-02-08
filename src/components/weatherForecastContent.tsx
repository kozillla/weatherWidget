import React from "react";
import { DailyForecast } from "./dailyForecast";
import { ForecastHeaderComponent } from "./forecastHeaderComponent";

interface MyProps {
  fetchingCityWeather: boolean;
  weatherData: any;
  unitType: number;
}

export class WeatherForecastContent extends React.Component<MyProps> {
  render() {
    return (
      <div className="weatherForecastContent">
        {this.props.fetchingCityWeather ? (
          <div className="loading">
            <span>LOADING...</span>
          </div>
        ) : (
          <>
            <div>
              <ForecastHeaderComponent
                weatherData={this.props.weatherData}
                tempType={this.props.unitType}
              />
            </div>
            <div className="dailyForecastWrap">
              {this.props.weatherData.consolidated_weather &&
                this.props.weatherData.consolidated_weather.map((data: any) => {
                  return (
                    <DailyForecast
                      key={data.id}
                      forecastData={data}
                      tempType={this.props.unitType}
                    />
                  );
                })}
            </div>
          </>
        )}
      </div>
    );
  }
}
