import view from "./view.js";
import resultsView from "./resultsView.js";
import summaryView from "./summaryView";

class SearchView extends view {
  _parentEl = document.querySelector(".search-form");
  _input = document.querySelector(".search-input");
  _container = document.querySelector(".information");

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
      const container = document.querySelector(".information");
      e.preventDefault();
      resultsView._parentEl.classList.remove("hidden");
      container.classList.remove("slide-up");
      handler();
    });
  }

  _generateMarkup = function () {
    let markup;
    if (this._data.city && this._data.state && this._data.country) {
      markup = `
      <button data-id=${this._data.id} class="search-result">
        <p>${this._data.city}, ${this._data.state}, ${this._data.country}</p>
      </button>
    `;
    } else if (this._data.city && this._data.state && !this._data.country) {
      markup = `
      <button data-id=${this._data.id} class="search-result">
        <p>${this._data.city}, ${this._data.state}</p>
      </button>
    `;
    } else if (this._data.city && !this._data.state && !this._data.country) {
      markup = `
      <button data-id=${this._data.id} class="search-result">
        <p>${this._data.city}</p>
      </button>
    `;
    } else if (this._data.city && this._data.state && this._data.country) {
      markup = `
      <button data-id=${this._data.id} class="search-result">
        <p>${this._data.city}, ${this._data.country}</p>
      </button>
    `;
    }

    return markup;
  };
}

export default new SearchView();
