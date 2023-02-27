import view from "./view.js";
import resultsView from "./resultsView.js";

class SearchView extends view {
  _parentEl = document.querySelector(".search-form");
  _input = document.querySelector(".search-input");

  _getQuery() {
    const query = this._input.value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._input.value = "";
    this._input.blur();
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      resultsView._parentEl.classList.remove("hidden");
      handler();
    });
  }

  _generateMarkup = function () {
    const markup = `
      <button data-id=${this._data.id} class="search-result">
        <p>${this._data.city}, ${this._data.state}, ${this._data.country}</p>
      </button>
    `;
    return markup;
  };
}

export default new SearchView();
