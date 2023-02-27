import { async } from "regenerator-runtime";
import view from "./view.js";

class timeView extends view {
  _parentEl = document.querySelector(".currentTime");

  _generateMarkup() {
    let markup;

    if (this._data.city && this._data.country) {
      markup = `
     <p class="cityName">${this._data.city}, ${this._data.country} </p>
     <p class="cityName">${this._data.todayString}</p>
    `;
    } else {
      markup = `
     <p class="cityName">${this._data.city}</p>
     <p class="cityName">${this._data.todayString}</p>
    `;
    }
    return markup;
  }
}

export default new timeView();
