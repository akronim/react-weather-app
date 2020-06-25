import config from "../helpers/global-variables";
import weatherService from "../helpers/weather.service";
import {
  fetchWeatherBegin,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from "./actionCreators";

export const getWeather = (args) => {
  let url = `${config.weather_api_base_url}?id=${args}&appid=${config.weather_api_key}`;

  return (dispatch) => {
    dispatch(fetchWeatherBegin());
    weatherService
      .getByCity(url, (json) => dispatch(fetchWeatherSuccess(json)))
      .catch((error) => dispatch(fetchWeatherFailure(error)));
  };
};
