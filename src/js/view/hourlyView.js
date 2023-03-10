import view from "./view.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import icons from "url:../../img/icons.svg";
import { async } from "regenerator-runtime";

class hourlyView extends view {
  _parentEl = document.querySelector(".hourly-view");
  _hourly = document.querySelector(".hourly");

  _generateMarkup() {
    const markup = this._data
      .map((data, i) => this._generateInfo(data, i))
      .join("");
    return markup;
  }

  _generateInfo(data, index) {
    document.querySelector(".hourly-title").innerHTML = "Hourly Weather";
    const markup = `
      <div class="container container--hourly" data-container="${index}" >
        <div class="short-information">
          <div class="icon-set">
            <p>${data.time}</p>
          </div>
          <div class="icon-set">
      
            <p>${data.celsius} / ${data.feelsLikeCelcius}</p>
          </div>
          <div class="icon-set">
            <svg class="medium-icon">
              <title>${data.weatherStatus}</title>
              <use href="${icons}#${data.weatherCode}"></use>
            </svg>
          </div>
          <div class="icon-set">
            <svg class="medium-icon">
              <title>Wind speed</title>
              <use href="${icons}#icon-wind"></use>
            </svg>
            <p>${data.windSpeedKilo}</p>
          </div>
          <div class="expand-information icon-set">
            <button class="icon-expand-btn" data-id="${index}">
              <svg class="small-icon">
                <title>Expand detailed information</title>
                <use href="${icons}#icon-chevron-down"></use>
              </svg>
            </button>
          </div>
        </div>
        <div class="long-information hidden-info" id="${index}">
          <div class="icon-set">
            <svg class="small-icon">
              <title>Visibility</title>
              <use href="${icons}#icon-eye"></use>
            </svg>
            <p>${data.visibilityKilo}</p>
          </div>
          <div class="icon-set">
            <svg class="small-icon">
              <title>Humidity</title>
              <use href="${icons}#icon-droplet"></use>
            </svg>
            <p>${data.humidity}</p>
          </div>
          <div class="icon-set">
            <svg class="small-icon">
              <title>Snow depth</title>
              <use href="${icons}#icon-snowflake"></use>
            </svg>
            <p>${data.snowDepthMeter}</p>
          </div>
          <div class="icon-set">
            <svg class="small-icon">
              <title>Cloud cover</title>
              <use href="${icons}#icon-clouds"></use>
            </svg>
            <p>${data.cloudCover}</p>
          </div>
          <div class="icon-set">
            <svg class="small-icon">
              <title>Precipitation probability</title>
              <use href="${icons}#icon-cloud-rain"></use>
            </svg>
            <p>${data.precipitation}</p>
          </div>
          <div class="icon-set">
            <svg class="medium-icon">
              <title>Wind direction</title>
              <use href="${icons}#icon-compass"></use>
            </svg>
            <svg class="small-icon" style="transform: rotate(${data.windDirection}deg)">
              <use href="${icons}#icon-arrow-up"></use>
            </svg>
          </div>
        </div>
      </div>
    `;
    return markup;
  }

  addHandlerExpand() {
    this._hourly.addEventListener("click", function (e) {
      const expandBtn = e.target.closest(".icon-expand-btn");
      if (!expandBtn) return;
      const id = expandBtn.dataset.id;
      const detail = document.getElementById(`${id}`);
      expandBtn.style.rotate = "180deg";
      expandBtn.classList.toggle("rotated");
      expandBtn.style.rotate = expandBtn.classList.contains("rotated")
        ? "180deg"
        : "-360deg";

      detail.classList.toggle("hidden-info");

      detail.classList.contains("hidden-info")
        ? (detail.style.height = "0.01px")
        : (detail.style.height = "auto");
    });
  }

  addHandlerPagination(handler) {
    this._hourly.addEventListener("click", function (e) {
      const pagination = e.target.closest(".pagination-btn");
      if (!pagination) return;
      const direction = pagination.dataset.arrow;
      handler(direction);
    });
  }
}

export default new hourlyView();
