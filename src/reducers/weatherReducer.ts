export const FETCH_LOCATION = "FETCH_LOCATION";
export const FETCH_LOCATION_FULFILLED = "FETCH_LOCATION_FULFILLED";
export const FETCH_LOCATION_REJECTED = "FETCH_LOCATION_REJECTED";

export const FETCH_CITY_WEATHER = "FETCH_CITY_WEATHER";
export const FETCH_CITY_WEATHER_FULFILLED = "FETCH_CITY_WEATHER_FULFILLED";
export const FETCH_CITY_WEATHER_REJECTED = "FETCH_CITY_WEATHER_REJECTED";

export const SET_UNIT_TYPE = "SET_UNIT_TYPE";

export interface ICity {
  title: string;
  woeid: number;
  location_type: string;
  latt_long: string;
}

export interface IWeather {
  fetchedCities: [ICity];
  fetchingCitySearch: boolean;
  fetchingCityWeather: boolean;
  weatherData: any;
  unitType: number;
}

const defaultState: IWeather = {
  fetchedCities: [
    {
      title: "",
      woeid: 0,
      location_type: "",
      latt_long: ""
    }
  ],
  fetchingCityWeather: false,
  fetchingCitySearch: false,
  weatherData: {},
  unitType: 1
};

export default function reducer(
  state = defaultState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case FETCH_LOCATION: {
      return {
        ...state,
        fetchingCitySearch: true
      };
    }
    case FETCH_LOCATION_FULFILLED: {
      return {
        ...state,
        fetchedCities: action.payload,
        fetchingCitySearch: false
      };
    }
    case FETCH_LOCATION_REJECTED: {
      return {
        ...state,
        fetchingCitySearch: false
      };
    }

    case FETCH_CITY_WEATHER: {
      return {
        ...state,
        fetchingCityWeather: true
      };
    }

    case FETCH_CITY_WEATHER_FULFILLED: {
      return {
        ...state,
        weatherData: action.payload,
        fetchingCityWeather: false
      };
    }

    case FETCH_CITY_WEATHER_REJECTED: {
      return {
        ...state,
        fetchingCityWeather: false
      };
    }

    case SET_UNIT_TYPE: {
      return {
        ...state,
        unitType: action.payload
      };
    }

    default:
      return state;
  }
}
