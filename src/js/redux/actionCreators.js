export const FETCH_WEATHER_BEGIN = "FETCH_WEATHER_BEGIN";
export const FETCH_WEATHER_SUCCESS = "FETCH_WEATHER_SUCCESS";
export const FETCH_WEATHER_FAILURE = "FETCH_WEATHER_FAILURE";

export const fetchWeatherBegin = () => ({
  type: FETCH_WEATHER_BEGIN,
});

export const fetchWeatherSuccess = (payload) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload,
});

export const fetchWeatherFailure = (error) => ({
  type: FETCH_WEATHER_FAILURE,
  payload: { error },
});
