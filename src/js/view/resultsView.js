import { async } from "regenerator-runtime";
import view from "./view.js";
import searchView from "./searchView.js";
import icons from "url:../../img/icons.svg";

class ResultsView extends view {
  _parentEl = document.querySelector(".results");
  _errorMessage = "No cities found. Please try again.";

  addHandlerSelect(handler) {
    this._parentEl.addEventListener("click", function (e) {
      document.querySelector(".section--hourly").classList.remove("none");
      document.querySelector(".section--daily").classList.remove("none");
      const container = document.querySelector(".information");
      const btn = e.target.closest(".search-result");
      if (!btn) return;
      this.classList.add("hidden");
      container.classList.remove("slide-up");
      handler(btn.dataset.id);
    });
  }

  _generateMarkup() {
    const str = this._data
      .map((result) => searchView.render(result, false))
      .join("");
    return str;
  }

  _renderError(error = this._errorMessage) {
    const markup = `
    <div class="alert">
      <div>
        <svg class="error-icon">
          <use href="${icons}#icon-error"></use>
        </svg>
      </div>
      <p>${error}</p>
    </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new ResultsView();
