import { async, mark } from "regenerator-runtime";
import view from "./view.js";
import icons from "url:../../img/icons.svg";

class summaryView extends view {
  _parentEl = document.querySelector(".summary-text-box");

  _generateMarkup() {
    //icon-clouds
    //icon-clouds1
    //icon-cloud-sun
    //icon-cloud-fog
    //icon-cloud-wind
    //icon-cloud-snow
    //icon-cloud-rain
    //icon-cloud-lightning
    //icon-cloud-sun-rain
    //icon-cloud-sun-snow
    //icon-cloud-sun-lightning
    //icon-weather-sunny

    let icon;
    if (+this._data.weatherCode === 0) icon = "icon-weather-sunny";
    else if (
      +this._data.weatherCode === 1 ||
      +this._data.weatherCode === 2 ||
      +this._data.weatherCode === 3
    )
      icon = "icon-cloud-sun";
    else if (
      +this._data.weatherCode === 51 ||
      +this._data.weatherCode === 53 ||
      +this._data.weatherCode === 55 ||
      +this._data.weatherCode === 56 ||
      +this._data.weatherCode === 57 ||
      +this._data.weatherCode === 61 ||
      +this._data.weatherCode === 63 ||
      +this._data.weatherCode === 65 ||
      +this._data.weatherCode === 66 ||
      +this._data.weatherCode === 67 ||
      +this._data.weatherCode === 80 ||
      +this._data.weatherCode === 81 ||
      +this._data.weatherCode === 82
    )
      icon = "icon-cloud-rain";
    else if (
      +this._data.weatherCode === 45 ||
      +this._data.weatherCode === 48 ||
      +this._data.weatherCode === 71 ||
      +this._data.weatherCode === 73 ||
      +this._data.weatherCode === 75 ||
      +this._data.weatherCode === 77 ||
      +this._data.weatherCode === 85 ||
      +this._data.weatherCode === 86
    )
      icon = "icon-cloud-snow";
    else if (
      +this._data.weatherCode === 95 ||
      +this._data.weatherCode === 96 ||
      +this._data.weatherCode === 99
    )
      icon = "icon-cloud-lightning";

    const markup = `
      <div class="summary-card">
        <p class="summary-text">Temperature</p>
        <p class="summary-text small temperature">${this._data.temperature} °C</p>
        <p class="summary-text">Current status</p>
          <svg class="currentIcon">
            <use href="${icons}#${icon}"></use>
          </svg>
      </div>
      <div class="summary-card">
        <p class="summary-text">Wind Speed</p>
        <p class="summary-text small windSpeed">${this._data.windSpeed} km/h</p>
        <p class="summary-text">Wind Direction</p>
        <p class="summary-text small windDirection">${this._data.windDirection}°</p>
      </div>
    `;
    return markup;
  }
}

export default new summaryView();
