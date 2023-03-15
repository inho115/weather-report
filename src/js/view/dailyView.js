import view from "./view.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import icons from "url:../../img/icons.svg";
import { async } from "regenerator-runtime";

class dailyView extends view {
  _parentEl = document.querySelector(".daily-view");
  _daily = document.querySelector(".daily");

  _generateMarkup() {
    const markup = this._data
      .map((data, i) => this._generateInfo(data, i))
      .join("");
    return markup;
  }

  _generateInfo(data, index) {
    const width = window.innerWidth;
    document.querySelector(".daily-title").innerHTML = "Daily Weather";
    const markup = `
    <div class="daily-card container" ${
      width < 950 ? `style="transform:translateX(${index * 100}%)` : ""
    }" data-pos="${index * 100}">
      <p class="daily-text">${data.date}</p>
      <div class="icon-set icon-box">
        <svg class="small-icon">
          <title>Current Weather</title>
          <use href="${icons}#${data.weatherCode}"></use>
        </svg>
        <p>${data.weatherStatus}</p> 
      </div>
      <div class="icon-set icon-box">
        <svg class="small-icon">
          <title>temperature max</title>
          <use href="${icons}#icon-thermometer-full"></use>
        </svg>
        <p>${data.temperatureMaxCelsius}</p>
      </div>
      <div class="icon-set icon-box">
        <svg class="small-icon">
          <title>temperature min</title>
          <use href="${icons}#icon-thermometer-low"></use>
        </svg>
        <p>${data.temperatureMinCelsius}</p>
      </div>
      <div class="icon-set icon-box">
        <svg class="small-icon">
          <title>Sun Rise</title>
          <use href="${icons}#icon-sun"></use>
        </svg>
        <p>${data.sunrise}</p>
      </div>
      <div class="icon-set icon-box">
        <svg class="small-icon">
          <title>Sun set</title>
          <use href="${icons}#icon-sunset"></use>
        </svg>
        <p>${
          `0` +
          (+data.sunset.slice(0, 2) -
            12 +
            data.sunset.slice(2, data.sunset.length))
        }</p>
      </div>
      <div class="icon-set icon-box">
        <svg class="small-icon">
          <title>UV index</title>
          <use href="${icons}#icon-sunglasses"></use>
        </svg>
        <p>${data.uvMax}</p>
      </div>
      <div class="icon-set icon-box">
        <svg class="small-icon">
          <title>rain sum</title>
          <use href="${icons}#icon-cloud-rain"></use>
        </svg>
        <p>${data.rainSum}</p>
      </div>
      <div class="icon-set icon-box">
        <svg class="small-icon">
          <title>Snow Sum</title>
          <use href="${icons}#icon-snowflake"></use>
        </svg>
        <p>${data.snowfallSum}</p>
      </div>
    </div>
    `;
    return markup;
  }

  addHanlderPagination() {
    this._daily.addEventListener("click", function (e) {
      const btn = e.target.closest(".pagination-btn");
      const direction = btn.dataset.arrow;
      let position = document.querySelector(".daily-view").dataset.move;
      const sliders = document.querySelectorAll(".daily-card");
      if (direction === "left") {
        if (sliders[0].dataset.pos == 0) {
          document.querySelector(
            ".container--grid"
          ).style.transform = `translateX(${+position + -600})%`;
          sliders.forEach((slider, i) => {
            slider.style.transform = `translateX(${
              +slider.dataset.pos + -600
            }%)`;
            slider.dataset.pos = +slider.dataset.pos + -600;
          });
        } else {
          document.querySelector(
            ".container--grid"
          ).style.transform = `translateX(${+position + 100})%`;
          sliders.forEach((slider, i) => {
            slider.style.transform = `translateX(${
              +slider.dataset.pos + 100
            }%)`;
            slider.dataset.pos = +slider.dataset.pos + 100;
          });
        }
      }
      if (direction === "right") {
        if (sliders[6].dataset.pos == 0) {
          document.querySelector(
            ".container--grid"
          ).style.transform = `translateX(${+position + 600})%`;
          const sliders = document.querySelectorAll(".daily-card");
          sliders.forEach((slider, i) => {
            slider.style.transform = `translateX(${
              +slider.dataset.pos + 600
            }%)`;
            slider.dataset.pos = +slider.dataset.pos + 600;
          });
        } else {
          document.querySelector(
            ".container--grid"
          ).style.transform = `translateX(${+position + -100})%`;
          const sliders = document.querySelectorAll(".daily-card");
          sliders.forEach((slider, i) => {
            slider.style.transform = `translateX(${
              +slider.dataset.pos + -100
            }%)`;
            slider.dataset.pos = +slider.dataset.pos + -100;
          });
        }
      }
    });
  }
}

export default new dailyView();
