import React from "react";
import "./App.css";

//Redux
import store from "./store/store";
import { Provider } from "react-redux";

//Components
import WeatherWidgetContainer from "./components/weatherWidgetContainer";

const App = () => {
  return (
    <Provider store={store}>
      <WeatherWidgetContainer />
    </Provider>
  );
};

export default App;
