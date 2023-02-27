import { async, mark } from "regenerator-runtime";
import view from "./view.js";

class summaryView extends view {
  _parentEl = document.querySelector(".summary-text-box");

  _generateMarkup() {
    const markup = `
      <div class="summary-card">
        <p class="summary-text">Temperature</p>
        <p class="summary-text small temperature">${this._data.temperature} °C</p>
        <p class="summary-text">Current status</p>
        <p class="summary-text small weatherCode">${this._data.weatherCode}</p>
      </div>
      <div class="summary-card">
        <p class="summary-text">Wind Speed</p>
        <p class="summary-text small windSpeed">${this._data.windSpeed} km/h</p>
        <p class="summary-text">Wind Direction</p>
        <p class="summary-text small windDirection">${this._data.windDirection}</p>
      </div>
    `;
    return markup;
  }
}

export default new summaryView();
