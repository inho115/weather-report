import view from "./view.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import icons from "url:../../img/icons.svg";
import { async } from "regenerator-runtime";

class dailyView extends view {
  _parentEl = document.querySelector(".daily-cards");

  _generateMarkup() {}
}

export default new dailyView();
