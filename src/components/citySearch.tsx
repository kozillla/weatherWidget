import React from "react";
import { ICity } from "../reducers/weatherReducer";

interface MyProps {
  onInputChange: (value: string) => void;
  onCitySearch: (cityCode: number) => void;
  fetchingCitySearch: boolean;
  fetchedCities: [any];
}

export class CitySearch extends React.Component<MyProps> {
  constructor(props: MyProps) {
    super(props);
    this.selectElement = React.createRef();
  }

  selectElement: React.RefObject<any>;

  onInputChange = (event: any) => {
    this.props.onInputChange(event.target.value);
  };

  onCitySearch = () => {
    const cityCode = this.selectElement.current.value;
    this.props.onCitySearch(cityCode);
  };

  render() {
    return (
      <div className="menuHeaderRow">
        <div className="content">
          <label htmlFor="city">Filter : </label>
          <input
            name="city"
            type="text"
            list="cities"
            onChange={this.onInputChange}
          ></input>
          <div>
            <label htmlFor="selectCity">Select City : </label>
            <select name="selectCity" id="cities" ref={this.selectElement}>
              {this.props.fetchedCities.map((val: ICity) => {
                return (
                  <option key={val.woeid} value={val.woeid}>
                    {val.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="content">
          <button
            className="searchButton"
            onClick={this.onCitySearch}
            disabled={this.props.fetchingCitySearch}
          >
            Display Forecast
          </button>
        </div>
      </div>
    );
  }
}
