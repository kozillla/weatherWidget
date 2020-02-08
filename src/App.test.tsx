import React from "react";
import { render } from "@testing-library/react";
import { ForecastHeaderComponent } from "./components/forecastHeaderComponent";

import {
  findDayName,
  findMonthName,
  formatDay,
  formatTemp
} from "./functionHelper";

// helper function test
test("test findDayName function for given correct day", () => {
  const data = findDayName(1);
  expect(data).toBe("Monday");
});

test("test findDayName function for given incorrect day", () => {
  const data = findDayName(8);
  expect(data).toBe(undefined);
});

test("test findMonthName function for given correct month", () => {
  const data = findMonthName(1);
  expect(data).toBe("February");
});

test("test findMonthName function for given incorrect month", () => {
  const data = findMonthName(20);
  expect(data).toBe(undefined);
});

test("test formatDay function for given correct day", () => {
  const data = formatDay(1);
  expect(data).toBe("1st");
});

test("test formatDay function for given incorrect day", () => {
  const data = formatDay(27);
  expect(data).toBe("27th");
});

test("test formatTemp function for given correct temperature convert to Celcius", () => {
  const data = formatTemp(1, 20);
  expect(data).toBe(20);
});

test("test formatTemp function for given correct temperature convert to Farenthite", () => {
  const data = formatTemp(2, 20);
  expect(data).toBe(68);
});

//ForecastHeaderComponent tests
test("test ForecastHeaderComponent component", async () => {
  const weatherData = {
    title: "Melbourne",
    time: "20091020",
    consolidated_weather: [
      {
        the_temp: 10,
        weather_state_name: "abc",
        weather_state_abbr: "aabbcc",
        wind_speed: 10,
        wind_direction_compass: "SSE",
        humidity: 10,
        air_pressure: 20,
        predictability: 100
      }
    ]
  };
  const tempType = 1;
  const component = render(
    <ForecastHeaderComponent weatherData={weatherData} tempType={tempType} />
  );
  expect(
    component.container.getElementsByClassName("cityName")[0].textContent
  ).toBe("Melbourne");
  expect(
    component.container.getElementsByClassName("temperatureWrap")[0].textContent
  ).toBe("10°C");
});
