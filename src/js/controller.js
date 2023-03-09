import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";
import * as model from "./model.js";
import resultsView from "./view/resultsView.js";
import searchView from "./view/searchView.js";
import summaryView from "./view/summaryView.js";
import timeView from "./view/timeView.js";
import hourlyView from "./view/hourlyView.js";
import dailyView from "./view/dailyView.js";

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

    // 6. render hourly
    hourlyView.render(model.information.hourly.slice(0, 7));

    // 7. render daily
    dailyView.render(model.information.daily);
  } catch (err) {
    console.log(err);
  }

  // once page is loaded, idealy should render based on user's location
  // **** need to create function to find out closest hour to current time, to use for rendering hourly from that hour
  // **** need to create box for error messages (for when couldnt find city by a input)
};

const controlPagination = function (direction) {
  model.changePage(direction);

  hourlyView.render(
    model.information.hourly.slice(
      model.information.currentPage[0],
      model.information.currentPage[1]
    )
  );
};

const init = function () {
  model.loadMap();
  model.getDate();
  searchView.addHandlerSearch(controlCitySearch);
  resultsView.addHandlerSelect(controlSelect);
  hourlyView.addHandlerExpand();
  hourlyView.addHandlerPagination(controlPagination);
  dailyView.addHanlderPagination();
  // paginationView.addHandlerClick(control pagination) --> render next few hours on the hourly section, daily will be chart
};
init();

// change ID into URL
// window.history.pushState(null, '', `#${model.state.recipe.id}`);
