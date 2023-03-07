import { async, mark } from "regenerator-runtime";
import view from "./view.js";
import icons from "url:../../img/icons.svg";

class summaryView extends view {
  _parentEl = document.querySelector(".summary-text-box");

  _generateMarkup() {
    const markup = `
      <div class="summary-card">
        <p class="summary-text">Temperature</p>
        <p class="summary-text small temperature">${this._data.celsius}</p>
        <p class="summary-text">Current status</p>
        <svg class="current-status-icon">
          <use href="${icons}#${this._data.weatherCode}"></use>
        </svg>
      </div>
      <div class="summary-card">
        <p class="summary-text">Wind Speed</p>
        <p class="summary-text small windSpeed">${this._data.windSpeedKilo}</p>
        <p class="summary-text" >Wind Direction</p>
        <svg class="wind-direction-icon" style="transform:rotate(${this._data.windDirection}deg)">
          <use href="${icons}#icon-arrow-up"></use>
        </svg>
      </div>
    `;
    return markup;
  }
}

export default new summaryView();
