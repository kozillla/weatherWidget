import React from "react";
import {
  searchLocations,
  getCityWeather,
  searchLocationsLongLat,
  setUnitTypes
} from "../actions/weatherActions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ICity, IWeather } from "../reducers/weatherReducer";
import { CitySearch } from "./citySearch";
import { WeatherForecastContent } from "./weatherForecastContent";
import { UnitSelect } from "./unitSelect";

interface MyProps {
  dispatch: Dispatch<any>;
  fetchedCities: [ICity];
  fetchingCitySearch: boolean;
  weatherData: any;
  unitType: number;
  fetchingCityWeather: boolean;
}

export class WeatherWidgetContainer extends React.Component<MyProps> {
  constructor(props: MyProps) {
    super(props);
    this.timer = 0;
    this.selectElement = React.createRef();
    this.selectedCity = "";
  }

  timer: number;
  selectedCity: string;
  selectElement: React.RefObject<any>;

  componentDidMount() {
    // get current location
    navigator.geolocation.getCurrentPosition(
      location => {
        this.props.dispatch(
          searchLocationsLongLat(
            String(location.coords.latitude),
            String(location.coords.longitude)
          )
        );
      },
      () => {
        alert("Can not access geolocation");
      }
    );
  }

  // fetch city names based on filter data
  onInputChange = (city: string) => {
    clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      this.props.dispatch(searchLocations(city));
      this.selectedCity = city;
    }, 500);
  };

  // fetch weather info through city code
  onCitySearch = (cityCode: number) => {
    this.props.dispatch(getCityWeather(cityCode));
  };

  // change unit system (metric/imperial)
  onUnitChange = (event: any) => {
    this.props.dispatch(setUnitTypes(event.target.value));
  };

  render() {
    const {
      fetchingCitySearch,
      fetchingCityWeather,
      weatherData,
      unitType,
      fetchedCities
    } = this.props;
    return (
      <>
        <CitySearch
          onInputChange={this.onInputChange}
          onCitySearch={this.onCitySearch}
          fetchingCitySearch={fetchingCitySearch}
          fetchedCities={fetchedCities}
        />
        <UnitSelect onUnitChange={this.onUnitChange} />
        <WeatherForecastContent
          fetchingCityWeather={fetchingCityWeather}
          weatherData={weatherData}
          unitType={unitType}
        />
      </>
    );
  }
}

const mapStateToProps = (store: IWeather) => {
  return {
    fetchedCities: store.fetchedCities,
    fetchingCitySearch: store.fetchingCitySearch,
    weatherData: store.weatherData,
    unitType: store.unitType,
    fetchingCityWeather: store.fetchingCityWeather
  };
};

export default connect(mapStateToProps)(WeatherWidgetContainer);
