import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";
import * as model from "./model.js";
import resultsView from "./view/resultsView.js";
import searchView from "./view/searchView.js";
import summaryView from "./view/summaryView.js";
import timeView from "./view/timeView.js";

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
    await model.loadWeather();

    // 4. Update weather information
    summaryView.render(model.information.current);

    // 5. Display city name and date
    timeView.render({
      ...model.information.date,
      ...model.information.selection,
    });
  } catch (err) {
    console.log(err);
  }
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
