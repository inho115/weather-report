export const CITY_API_URL = "https://geocoding-api.open-meteo.com/v1/";
export const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
export const HOURLY_PARAMETER =
  "&hourly=temperature_2m,relativehumidity_2m,precipitation,weathercode,visibility,windspeed_10m,snow_depth,apparent_temperature,winddirection_10m,precipitation_probability,cloudcover_low";
export const DAILY_PARAMETER = `&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,rain_sum,snowfall_sum,windspeed_10m_max,winddirection_10m_dominant&timezone=auto`;

// https://api.open-meteo.com/v1/forecast?latitude=43.70&longitude=-79.42&hourly=temperature_2m,relativehumidity_2m,weathercode,visibility,windspeed_10m,winddirection_10m
