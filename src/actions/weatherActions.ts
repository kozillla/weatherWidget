import { Dispatch } from "react";

import {
  FETCH_LOCATION,
  FETCH_LOCATION_FULFILLED,
  FETCH_LOCATION_REJECTED,
  FETCH_CITY_WEATHER,
  FETCH_CITY_WEATHER_FULFILLED,
  FETCH_CITY_WEATHER_REJECTED,
  SET_UNIT_TYPE
} from "../reducers/weatherReducer";

const api = "api/";

function fetchLocation() {
  return { type: FETCH_LOCATION };
}

function fetchLocationFullfiled(data: any) {
  return { type: FETCH_LOCATION_FULFILLED, payload: data };
}

function fetchLocationRejected() {
  return { type: FETCH_LOCATION_REJECTED };
}

// call external API to query cities based on provided name
export const searchLocations = (cityName: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(fetchLocation());
    fetch(api + `location/search/?query=${cityName}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch(fetchLocationFullfiled(data));
      })
      .catch(e => {
        dispatch(fetchLocationRejected());
      });
  };
};

// call external API to get closest city with the provided latitude and longitude
export const searchLocationsLongLat = (lat: string, long: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(fetchLocation());
    fetch(api + `location/search/?lattlong=${lat},${long}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data && data[0] && data[0].woeid) {
          dispatch(getCityWeather(data[0].woeid));
        }
      })
      .catch(e => {
        // handle exception here
      });
  };
};

function fetchCityWeather() {
  return { type: FETCH_CITY_WEATHER };
}

function fetchCityWeatherFulfilled(data: any) {
  return { type: FETCH_CITY_WEATHER_FULFILLED, payload: data };
}

function fetchCityWeatherRejected() {
  return { type: FETCH_CITY_WEATHER_REJECTED };
}

// call external API to get weather forecast for the givem city woeid number
export const getCityWeather = (woeid: number) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(fetchCityWeather());
    fetch(api + `location/${woeid}/`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch(fetchCityWeatherFulfilled(data));
      })
      .catch(e => {
        dispatch(fetchCityWeatherRejected());
      });
  };
};

export const setUnitTypes = (type: number) => {
  return {
    type: SET_UNIT_TYPE,
    payload: Number(type)
  };
};
