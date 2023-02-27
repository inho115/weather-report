import * as model from "./model.js";
import resultsView from "./view/resultsView.js";
import searchView from "./view/searchView.js";
import summaryView from "./view/summaryView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

const controlCitySearch = async function () {
  try {
    const query = searchView._getQuery();
    await model.loadCitySearchResults(query);
    resultsView.render(model.information.cities);
  } catch (err) {
    console.log(err);
  }
};

const controlSelect = async function (id) {
  try {
    // 1. Load information of the city to model
    await model.loadSelect(id);

    // 2. load the map of the city
    model.changeMap();

    // 3. load weather information
    await controlWeather();

    // 4. Update weather information
    summaryView.addHandlerCurrent(model.information.current);
  } catch (err) {
    console.log(err);
  }
};

const controlWeather = async function () {
  // 1. load weather information (current, hourly, daily)
  await model.loadWeather();
};

const init = function () {
  model.loadMap();
  model.getDate();
  searchView.addHandlerSearch(controlCitySearch);
  resultsView.addHandlerSelect(controlSelect);
};
init();

// change ID into URL
// window.history.pushState(null, '', `#${model.state.recipe.id}`);
