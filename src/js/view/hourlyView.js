import view from "./view.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import icons from "url:../../img/icons.svg";
import { async } from "regenerator-runtime";

class hourlyView extends view {
  _parentEl = document.querySelector(".section--hourly");

  _generateMarkup = function () {
    const str = this._data.map((data) => this._generateInfo(data)).join("");
    return str;
  };

  _generateInfo = function (data) {
    const markup = `
      <div class="container container--hourly" data-container="1">
        <div class="short-information">
          <div class="icon-set">
            <p>${data.time}</p>
          </div>
          <div class="icon-set">
            <svg class="small-icon">
              <title>Temperature / Feels like temperature</title>
              <use href="${icons}#${data.weatherCode}"></use>
            </svg>
            <p>${data.celsius} / ${data.feelsLikeCelcius} (feels like)</p>
          </div>
          <div class="icon-set">
            <svg class="medium-icon">
              <title>Partly Cloudy</title>
              <use href="${icons}#${data.weatherCode}"></use>
            </svg>
          </div>
          <div class="icon-set">
            <svg class="small-icon">
              <title>Wind speed</title>
              <use href="${icons}#icon-wind"></use>
            </svg>
            <p>${data.windSpeedKilo}</p>
          </div>
          <div class="expand-information icon-set">
            <button class="icon-btn" data-id="1">
              <svg class="small-icon">
                <title>Expand detailed information</title>
                <use href="${icons}#icon-chevron-down"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="long-information up" id="1">
          <div class="icon-set">
            <svg class="small-icon">
              <title>Highest temperature</title>
              <use href="${icons}#icon-max"></use>
            </svg>
            <p></p>
          </div>
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
            <p>${data.snowDepth}</p>
          </div>
          <div class="icon-set" tooltip="minimum">
            <svg class="small-icon">
              <title>Lowest temperature</title>
              <use href="${icons}#icon-min"></use>
            </svg>
            <p>-12 °C</p>
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
  };
}

export default new hourlyView();

{
  /* <div class="container container--hourly slide" id="test" data-container="2">
  <div class="short-information">
    <div class="icon-set">
      <p>12 PM</p>
    </div>
    <div class="icon-set">
      <svg class="small-icon">
        <title>Temperature / Feels like temperature</title>
        <use href="${icons}#icon-thermometer-low"></use>
      </svg>
      <p>-1 °C / -10 °C</p>
    </div>
    <div class="icon-set">
      <svg class="medium-icon">
        <title>Partly Cloudy</title>
        <use href="${icons}#icon-cloud-sun"></use>
      </svg>
    </div>
    <div class="icon-set">
      <svg class="small-icon">
        <title>Wind speed</title>
        <use href="${icons}#icon-wind"></use>
      </svg>
      <p>55 km/h</p>
    </div>
    <div class="expand-information icon-set">
      <button class="icon-btn" data-id="2">
        <svg class="small-icon">
          <title>Expand detailed information</title>
          <use href="url:src/img/icons.svg#icon-chevron-down"></use>
        </svg>
      </button>
    </div>
  </div>

  <div class="long-information up" id="2">
    <div class="icon-set">
      <svg class="small-icon">
        <title>Highest temperature</title>
        <use href="url:src/img/icons.svg#icon-max"></use>
      </svg>
      <p>1 °C</p>
    </div>
    <div class="icon-set">
      <svg class="small-icon">
        <title>Visibility</title>
        <use href="url:src/img/icons.svg#icon-eye"></use>
      </svg>
      <p>24 km</p>
    </div>
    <div class="icon-set">
      <svg class="small-icon">
        <title>Humidity</title>
        <use href="url:src/img/icons.svg#icon-droplet"></use>
      </svg>
      <p>85 %</p>
    </div>
    <div class="icon-set">
      <svg class="small-icon">
        <title>Snow depth</title>
        <use href="url:src/img/icons.svg#icon-snowflake"></use>
      </svg>
      <p>0.5 meters</p>
    </div>
    <div class="icon-set" tooltip="minimum">
      <svg class="small-icon">
        <title>Lowest temperature</title>
        <use href="url:src/img/icons.svg#icon-min"></use>
      </svg>
      <p>-12 °C</p>
    </div>
    <div class="icon-set">
      <svg class="small-icon">
        <title>Cloud cover</title>
        <use href="url:src/img/icons.svg#icon-clouds"></use>
      </svg>
      <p>100 %</p>
    </div>
    <div class="icon-set">
      <svg class="small-icon">
        <title>Precipitation probability</title>
        <use href="url:src/img/icons.svg#icon-cloud-rain"></use>
      </svg>
      <p>0 %</p>
    </div>
    <div class="icon-set">
      <svg class="medium-icon">
        <title>Wind direction</title>
        <use href="url:src/img/icons.svg#icon-compass"></use>
      </svg>
      <svg class="small-icon" style="transform: rotate(145deg)">
        <use href="url:src/img/icons.svg#icon-arrow-up"></use>
      </svg>
    </div>
  </div>
</div>; */
}

// hourly.addEventListener("click", function (e) {
//   const btn = e.target.closest(".icon-btn");
//   if (!btn) return;
//   const id = btn.dataset.id;
//   const detail = document.getElementById(`${+id}`);
//   detail.classList.toggle("up");
//   console.log(`${+id + 1}`);
//   const next = document.querySelector(`[data-container="${+id + 1}"]`);
//   if (!next) return;
//   next.classList.toggle("slide");
// });
