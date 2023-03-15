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
    model.information.query = searchView._getQuery();
    await model.loadCitySearchResults(model.information.query);
    resultsView.render(model.information.cities);
  } catch (err) {
    resultsView._renderError(err);
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
    console.log(model.information.daily);
    dailyView.render(model.information.daily);
  } catch (err) {
    console.log(err);
  }
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

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-150px",
  }
);

const init = function () {
  model.loadMap();
  model.getDate();
  searchView.observer(obs);
  searchView.addHandlerSearch(controlCitySearch);
  resultsView.addHandlerSelect(controlSelect);
  hourlyView.addHandlerExpand();
  hourlyView.addHandlerPagination(controlPagination);
  dailyView.addHanlderPagination();
};
init();
