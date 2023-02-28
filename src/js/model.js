import { async } from "regenerator-runtime";
import {
  CITY_API_URL,
  WEATHER_API_URL,
  HOURLY_PARAMETER,
  DAILY_PARAMETER,
} from "./config.js";

export const information = {
  cities: [],
  selection: [],
  map: {},
  image: {},
  date: {
    todayString: "",
    weekLaterString: "",
    todayNum: [],
    weekLaterNum: [],
  },
  current: {},
  hourly: {},
  daily: {},
};

const createCity = function (data) {
  const city = data.results.map((city) => {
    return {
      id: city.id,
      city: city.name,
      state: city.admin1,
      country: city.country,
      countryId: city.country_id,
      timezone: city.timezone,
      lat: city.latitude,
      lng: city.longitude,
    };
  });
  return city;
};

const createCurrent = function (data) {
  return {
    temperature: data.temperature,
    weatherCode: data.weathercode,
    windSpeed: data.windspeed,
    windDirection: data.winddirection,
  };
};

const createHourly = function (data) {
  return {
    precipitation: data.precipitation,
    humidity: data.relativehumidity_2m,
    temperature: data.temperature_2m,
    visibility: data.visibility,
    weatherCode: data.weathercode,
    windSpeed: data.windspeed_10m,
    snowDepth: data.snowDepth,
    feelsLike: data.apparent_temperature,
  };
};

const createDaily = function (data) {
  return {
    rainSum: data.rain_sum,
    snowfallSum: data.snowfall_sum,
    sunrise: data.sunrise,
    sunset: data.sunset,
    temperatureMax: data.temperature_2m_max,
    temperatureMin: data.temperature_2m_min,
    uvMax: data.uv_index_max,
    weatherCode: data.weathercode,
    windDirection: data.winddirection_10m_dominant,
    windSpeed: data.windspeed_10m_max,
  };
};

export const loadCitySearchResults = async function (query) {
  try {
    const data = await fetch(`${CITY_API_URL}search?name=${query}`);
    const response = await data.json();
    information.cities = createCity(response);
  } catch (err) {
    console.log(err);
  }
};

export const loadMap = async function () {
  var map = L.map("map").setView([43.65107, -79.347015], 6);
  information.map = map;

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
};

export const changeMap = async function () {
  information.map.panTo(
    new L.LatLng(information.selection.lat, information.selection.lng)
  );
};

export const loadSelect = async function (id) {
  const index = information.cities.findIndex((city) => city.id === +id);
  information.selection = information.cities[index];
};

export const loadWeather = async function () {
  const request = await fetch(
    `${WEATHER_API_URL}/?latitude=${information.selection.lat}&longitude=${information.selection.lng}&current_weather=true${HOURLY_PARAMETER}${DAILY_PARAMETER}&start_date=${information.date.todayNum}&end_date=${information.date.weekLaterNum}`
  );
  const response = await request.json();
  information.current = createCurrent(response.current_weather);
  information.hourly = createHourly(response.hourly);
  information.daily = createDaily(response.daily);
};

////////////////////////////////////////////////////////// Date Functions ////////////////////////////////////////////////////////////

export const getDate = function () {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const today = new Date();
  const monthAlpha = months[today.getMonth()];
  const monthNum = zeroInserter(today.getMonth() + 1);
  const day = zeroInserter(today.getDate());
  const year = today.getFullYear();
  const formattedAlphaDate = `${monthAlpha} ${day}, ${year}`;
  const formattedNumDate = `${year}-${monthNum}-${day}`;
  const date = new Date();
  const newDate = addWeeks(date, 1);
  const newMonthAlpha = months[newDate.getMonth()];
  const newMonthNum = zeroInserter(newDate.getMonth() + 1);
  const newDay = zeroInserter(newDate.getDate() - 1);
  const newYear = newDate.getFullYear();
  const formattedNewDate = `${newMonthAlpha} ${newDay}, ${newYear}`;
  const formattedNewNumDate = `${newYear}-${newMonthNum}-${newDay}`;

  information.date.todayNum = formattedNumDate;
  information.date.todayString = formattedAlphaDate;
  information.date.weekLaterNum = formattedNewNumDate;
  information.date.weekLaterString = formattedNewDate;
};

const addWeeks = function (date, weeks) {
  date.setDate(date.getDate() + 7 * weeks);
  return date;
};

const zeroInserter = function (date) {
  return +date < 10 ? `0${date}` : date;
};

// for sunset and sunrise, reformat to
// time.slice(11, time.length);
