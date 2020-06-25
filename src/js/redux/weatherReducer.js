import {
  FETCH_WEATHER_BEGIN,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
} from "./actionCreators";

const initialState = {
  city_weather: {},
  loading: false,
  error: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_BEGIN:
      return { ...state, loading: true, error: null };
    case FETCH_WEATHER_SUCCESS:
      return { ...state, loading: false, city_weather: action.payload };
    case FETCH_WEATHER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        city_weather: {},
      };
    default:
      return state;
  }
};

export default weatherReducer;
