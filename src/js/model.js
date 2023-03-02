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
    celsius: data.temperature,
    farenheit: (+data.temperature * 1.8 + 32).toFixed(1),
    weatherCode: iconSelector(data.weathercode),
    windSpeedKilo: +data.windspeed,
    windSpeedMile: (Math.round((+data.windspeed / 1.609) * 10) / 10).toFixed(1),
    windDirection: data.winddirection,
  };
};

const createHourly = function (data) {
  return {
    humidity: data.relativehumidity_2m,
    celsius: data.temperature_2m,
    farenheit: data.temperature_2m.map((temp) => (+temp * 1.8 + 32).toFixed(1)),
    visibilityKilo: data.visibility.map((meter) => +meter / 1000),
    visibilityMile: data.visibility.map((meter) =>
      (+meter / 1000 / 1.609).toFixed(1)
    ),
    originalWeatherCode: data.weathercode,
    weatherCode: data.weathercode.map((weatherCode) =>
      iconSelector(weatherCode)
    ),
    windDirection: data.winddirection_10m,
    windSpeedKilo: data.windspeed_10m,
    windSpeedMile: data.windspeed_10m.map((kilo) => (+kilo / 1.609).toFixed(1)),
    snowDepthMeter: data.snow_depth,
    snowDepthFeet: data.snow_depth,
    feelsLikeCelcius: data.apparent_temperature,
    feelsLikeFarenheit: data.apparent_temperature.map((temp) =>
      (+temp * 1.8 + 32).toFixed(1)
    ),
  };
};

const createDaily = function (data) {
  return {
    rainSum: data.rain_sum,
    snowfallSum: data.snowfall_sum,
    sunrise: data.sunrise.map((time) => time.slice(11, time.length)),
    sunset: data.sunset.map((time) => time.slice(11, time.length)),
    temperatureMax: data.temperature_2m_max,
    temperatureMin: data.temperature_2m_min,
    uvMax: data.uv_index_max.map((uv) => Math.round(uv)),
    originalWeatherCode: data.weathercode,
    weatherCode: data.weathercode.map((weatherCode) =>
      iconSelector(weatherCode)
    ),
    windDirection: data.winddirection_10m_dominant,
    windSpeedKilo: data.windspeed_10m_max,
    windSpeedMile: data.windspeed_10m_max.map((speed) =>
      Math.round(+speed / 1.609).toFixed(1)
    ),
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
  console.log("current", information.current);
  console.log("hourly", information.hourly);
  console.log("daily", information.daily);
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

const iconSelector = function (array) {
  const iconCloudSun = [1, 2, 3];
  const iconCloudFog = [45, 48];
  const iconRain = [51, 53, 55, 56, 57];
  const iconRainAlot = [61, 63, 65, 66, 67];
  const iconRainViolent = [80, 81, 82];
  const iconSnow = [71, 73, 75, 77];
  const iconSnowAlot = [85, 86];
  const iconCloudLightning = [95, 96, 99];

  if (array === 0) {
    return "icon-sunny";
  } else if (iconCloudSun.some((weatherCode) => weatherCode === array)) {
    return "icon-cloud-sun";
  } else if (iconCloudFog.some((weatherCode) => weatherCode === array)) {
    return "icon-cloud-fog";
  } else if (iconRain.some((weatherCode) => weatherCode === array)) {
    return "icon-rain";
  } else if (iconRainAlot.some((weatherCode) => weatherCode === array)) {
    return "icon-rain-alot";
  } else if (iconRainViolent.some((weatherCode) => weatherCode === array)) {
    return "icon-rain-violent";
  } else if (iconSnow.some((weatherCode) => weatherCode === array)) {
    return "icon-snow";
  } else if (iconSnowAlot.some((weatherCode) => weatherCode === array)) {
    return "icon-snow-alot";
  } else if (iconCloudLightning.some((weatherCode) => weatherCode === array)) {
    return "icon-cloud-lightning";
  }
};
