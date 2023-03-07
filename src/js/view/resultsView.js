import { async } from "regenerator-runtime";
import view from "./view.js";
import searchView from "./searchView.js";

class ResultsView extends view {
  _parentEl = document.querySelector(".results");
  _errorMessage = "No cities found. Please try again.";

  addHandlerSelect(handler) {
    this._parentEl.addEventListener("click", function (e) {
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
}

export default new ResultsView();
