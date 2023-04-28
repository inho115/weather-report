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
  query: "",
  date: {},
  current: [],
  hourly: [{}],
  daily: [{}],
  currentPage: [0, 7],
};

const createCity = function (data) {
  try {
    if (!data.results) {
      throw new Error(
        `There is no matching city ${information.query}. Please try again.`
      );
    }
    const city = data.results.map((city, i) => {
      return {
        index: i,
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
  } catch (err) {
    throw err;
  }
};

const createCurrent = function (data) {
  return {
    time: `${zeroInserter(data.time.slice(11, data.time.length))}`,
    celsius: `${data.temperature} °C`,
    farenheit: `${(+data.temperature * 1.8 + 32).toFixed(1)} °F`,
    weatherCode: iconSelector(
      data.weathercode,
      zeroInserter(data.time.slice(11, 13))
    ),
    weatherStatus: currentStatus(
      iconSelector(data.weathercode, zeroInserter(data.time.slice(11, 13)))
    ),
    windSpeedKilo: `${data.windspeed} km/h`,
    windSpeedMile: `${(Math.round((+data.windspeed / 1.609) * 10) / 10).toFixed(
      1
    )} mi/h`,
    windDirection: data.winddirection,
  };
};

const createHourly = function (data) {
  const hourly = data.relativehumidity_2m.map((info, i) => {
    return {
      time: `${zeroInserter(i > 24 ? i % 25 : i)}:00`,
      humidity: `${data.relativehumidity_2m[i]} %`,
      celsius: `${data.temperature_2m[i]} °C`,
      farenheit: `${(data.temperature_2m[i] * 1.8 + 32).toFixed(1)} °F`,
      visibilityKilo: `${data.visibility[i] / 1000} km`,
      visibilityMile: `${(data.visibility[i] / 1000 / 1.609).toFixed(1)} mi`,
      originalWeatherCode: data.weathercode[i],
      weatherCode: iconSelector(data.weathercode[i], i > 24 ? i % 25 : i),
      weatherStatus: currentStatus(
        iconSelector(data.weathercode[i], i > 24 ? i % 25 : i)
      ),
      windDirection: data.winddirection_10m[i],
      windSpeedKilo: `${data.windspeed_10m[i]} km/h`,
      windSpeedMile: `${(data.windspeed_10m[i] / 1.609).toFixed(1)} mi/h`,
      snowDepthMeter: `${data.snow_depth[i]} m`,
      snowDepthFeet: `${data.snow_depth[i]} ft`,
      feelsLikeCelcius: `${data.apparent_temperature[i]} °C`,
      feelsLikeFarenheit: `${(data.apparent_temperature[i] * 1.8 + 32).toFixed(
        1
      )} °F`,
      precipitation: `${data.precipitation_probability[i]} %`,
      cloudCover: `${data.cloudcover_low[i]} %`,
    };
  });
  return hourly;
};

const createDaily = function (data) {
  const daily = data.rain_sum.map((info, i) => {
    return {
      date:
        information.date.todayDate + i > +information.date.lastDayofMonth
          ? information.date.nextMonth +
            ` ` +
            zeroInserter(
              +information.date.todayDate + i - information.date.lastDayofMonth
            )
          : information.date.todayString.slice(0, 4) +
            (+information.date.todayDate + i),
      rainSum: `${data.rain_sum[i]} mm`,
      snowfallSum: `${data.snowfall_sum[i]} cm`,
      sunrise: `${data.sunrise[i].slice(11, data.sunrise[i].length)} AM`,
      sunset: `${data.sunset[i].slice(11, data.sunset[i].length)} PM`,
      temperatureMaxCelsius: `${data.temperature_2m_max[i]} °C`,
      temperatureMaxFarenheit: `${(
        data.temperature_2m_max[i] * 1.8 +
        32
      ).toFixed(1)} °F`,
      temperatureMinCelsius: `${data.temperature_2m_min[i]} °C`,
      temperatureMinFarenheit: `${(
        data.temperature_2m_min[i] * 1.8 +
        32
      ).toFixed(1)} °F`,
      uvMax: `${data.uv_index_max[i]}`,
      originalWeatherCode: data.weathercode[i],
      weatherCode: iconSelector(data.weathercode[i]),
      weatherStatus: currentStatus(iconSelector(data.weathercode[i])),
      windDirection: data.winddirection_10m_dominant[i],
      windSpeedKilo: `${data.windspeed_10m_max[i]} km/h`,
      windSpeedMile: `${Math.round(+data.windspeed_10m_max[i] / 1.609).toFixed(
        1
      )} mi/h`,
    };
  });
  return daily;
};

export const loadCitySearchResults = async function (query) {
  try {
    if (query.length === 0) {
      throw new Error("You have entered empty string. Please try again.");
    }
    const data = await fetch(`${CITY_API_URL}search?name=${query}`);
    const response = await data.json();
    information.cities = createCity(response);
  } catch (err) {
    throw err;
  }
};

export const loadMap = async function () {
  var map = L.map("map", { tap: false, dragging: false }).setView(
    [43.65107, -79.347015],
    6
  );
  information.map = map;

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  information.map.scrollWheelZoom.disable();
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
  console.log(information.daily);
};

export const changePage = function (direction) {
  if (direction === "right" && information.currentPage[1] != 168) {
    information.currentPage[0] += 7;
    information.currentPage[1] += 7;
  }

  if (direction === "left" && information.currentPage[0] != 0) {
    information.currentPage[0] -= 7;
    information.currentPage[1] -= 7;
  }
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
  const nextMonth = months[today.getMonth() + 1];
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
  const lastDayofMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  information.date.lastDayofMonth = lastDayofMonth.toString().slice(8, 10);
  information.date.todayDate = day;
  information.date.nextMonth = nextMonth;
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

const iconSelector = function (code, time = new Date().getHours()) {
  const iconCloudSun = [1, 2, 3];
  const iconCloudFog = [45, 48];
  const iconRain = [51, 53, 55, 56, 57];
  const iconRainAlot = [61, 63, 65, 66, 67];
  const iconRainViolent = [80, 81, 82];
  const iconSnow = [71, 73, 75, 77];
  const iconSnowAlot = [85, 86];
  const iconCloudLightning = [95, 96, 99];

  if (code === 0) {
    return time > 4 && time < 18 ? "icon-sun" : "icon-moon-stars";
  } else if (iconCloudSun.some((weatherCode) => weatherCode === code)) {
    return time > 4 && time < 18 ? "icon-cloud-sun" : "icon-cloud-moon";
  } else if (iconCloudFog.some((weatherCode) => weatherCode === code)) {
    return "icon-cloud-fog";
  } else if (iconRain.some((weatherCode) => weatherCode === code)) {
    return "icon-rain";
  } else if (iconRainAlot.some((weatherCode) => weatherCode === code)) {
    return "icon-rain-alot";
  } else if (iconRainViolent.some((weatherCode) => weatherCode === code)) {
    return "icon-rain-violent";
  } else if (iconSnow.some((weatherCode) => weatherCode === code)) {
    return "icon-snow";
  } else if (iconSnowAlot.some((weatherCode) => weatherCode === code)) {
    return "icon-snow-alot";
  } else if (iconCloudLightning.some((weatherCode) => weatherCode === code)) {
    return "icon-cloud-lightning";
  }
};

const currentStatus = function (weatherCode) {
  switch (weatherCode) {
    case "icon-sun":
      return "Clear sky";
    case "icon-moon-stars":
      return "Clear sky";
    case "icon-cloud-sun":
      return "Cloudy";
    case "icon-cloud-moon":
      return "Cloudy";
    case "icon-rain":
      return "Slightly raining";
    case "icon-rain-alot":
      return "Raining";
    case "icon-rain-violent":
      return "Raining";
    case "icon-snow":
      return "Slightly snowing";
    case "icon-snow-alot":
      return "Snowing";
    case "icon-cloud-lightning":
      return "Thunderstorm";
    case "icon-cloud-fog":
      return "foggy";
  }
};
