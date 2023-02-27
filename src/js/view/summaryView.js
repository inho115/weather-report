import { async } from "regenerator-runtime";
import view from "./view.js";

class summaryView extends view {
  _parentEl = document.querySelector(".summary");
  _temperature = document.querySelector(".temperature");
  _weatherCode = document.querySelector(".weatherCode");
  _windSpeed = document.querySelector(".windSpeed");
  _windDirection = document.querySelector(".windDirection");

  addHandlerCurrent(data) {
    this._temperature.innerHTML = `${data.temperature} °C`;
    this._weatherCode.innerHTML = `${data.weatherCode}`;
    this._windSpeed.innerHTML = `${data.windSpeed} km/h`;
    this._windDirection.innerHTML = `${data.windDirection}`;
  }
}

export default new summaryView();
