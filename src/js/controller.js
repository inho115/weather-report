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
    summaryView.test();

    // 5. Display city name and date
    timeView.render({
      ...model.information.date,
      ...model.information.selection,
    });

    // 6. render daily

    // 7. render hourly

    // 8. create controlPagination()

    // 9. create paginationView(including _generateMarkup(), addHandlerClick()) and send it to paginationView.addHandlerClick(control pagination)

    // once page is loaded, idealy should render based on user's location

    // **** celcius ferenheit conversion button - ALMOST DONE

    // **** need to create function to find out closest hour to current time, to use for rendering hourly from that hour

    // **** need to create function to transform wind direction to abbreviation (like NE, SW) from degree (130). Makes it more human readable -

    // **** need to create function to adjust icon based on recieved weather code, currently on summary view, but should be on model. - DONE

    // **** need to create box for error messages (for when couldnt find city by a input)
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  model.loadMap();
  model.getDate();
  searchView.addHandlerSearch(controlCitySearch);
  resultsView.addHandlerSelect(controlSelect);
  // paginationView.addHandlerClick(control pagination) --> render next few hours on the hourly section, daily will be chart
};
init();

// change ID into URL
// window.history.pushState(null, '', `#${model.state.recipe.id}`);
