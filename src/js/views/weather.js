import React from "react";
import config from "../helpers/global-variables";
import { connect } from "react-redux";
import { getWeather } from "../redux/weatherActions";

const Button = ({ handleClick, label }) => {
  const onClick = () => {
    handleClick();
  };
  return (
    <button className="btn" onClick={onClick}>
      {label}
    </button>
  );
};

class If extends React.Component {
  render() {
    let { condition, children } = this.props;
    if (!condition) {
      return null;
    }
    return children;
  }
}

class Weather extends React.Component {
  timer = 0;

  getCityWeather = (args) => {
    clearInterval(this.timer);
    this.props.dispatch(getWeather(args));
    this.timer = setInterval(
      () => this.props.dispatch(getWeather(args)),
      10000
    );
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  displayWeather() {
    const { error, loading, city_weather } = this.props;
    console.log({ city_weather });

    if (error) {
      return <div className="alert">Error! {error.message}</div>;
    }

    let city_data = {
      celsius: null,
      description: "",
      name: "",
      deviates: false,
    };

    if (city_weather && city_weather.weather) {
      city_data.name = city_weather.name;

      let celsius = Math.round(parseFloat(city_weather.main.temp) - 273.15);

      city_data.description = city_weather.weather[0].description;

      if (celsius >= 25 || celsius <= 20) {
        city_data.deviates = true;
      }

      city_data.celsius = celsius + "°";
    }
    return (
      <>
        <div className="spinner-container">
          <If condition={loading}>
            <div className="spinner"></div>
          </If>
        </div>
        <If condition={city_data.deviates}>
          <div className="alert">{"\u26A0"}</div>
        </If>
        <h1>{city_data.name}</h1>
        <h2>{city_data.celsius}</h2>
        <h3>{city_data.description}</h3>
      </>
    );
  }

  render() {
    return (
      <>
        <div className="header">
          <Button
            handleClick={() => this.getCityWeather(config.oslo_id)}
            label="OSLO"
          ></Button>
          <Button
            handleClick={() => this.getCityWeather(config.los_angeles_id)}
            label="LOS ANGELES"
          ></Button>
          <Button
            handleClick={() => this.getCityWeather(config.zagreb_id)}
            label="ZAGREB"
          ></Button>
        </div>
        <div className="content">
          <div className="card">{this.displayWeather()}</div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    city_weather: state.city_weather,
    loading: state.loading,
    error: state.error,
  };
}

export default connect(mapStateToProps)(Weather);
