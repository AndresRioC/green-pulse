const OPENWEATHER_BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL;
const OPENWEATHER_TOKEN = import.meta.env.VITE_OPENWEATHER_TOKEN;
const OIKOLAB_BASE_URL = import.meta.env.VITE_OIKOLAB_BASE_URL;
const OIKOLAB_TOKEN = import.meta.env.VITE_OIKOLAB_TOKEN;
//Avg temp Ont Mar 11 5y?

export async function getCurrentWeather(cityname: string) {
  const weatherResponse = await fetch(
    `${OPENWEATHER_BASE_URL}weather?q=${cityname}&appid=${OPENWEATHER_TOKEN}&units=metric`
  );
  const weatherData = await weatherResponse.json();
  console.log(weatherData);
  const airResponse = await fetch(
    `${OPENWEATHER_BASE_URL}air_pollution?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${OPENWEATHER_TOKEN}`
  );
  const airData = await airResponse.json();
  console.log(airData);
  const data: object = { ...weatherData, ...airData };
  console.log(data);
  return data;
}

export async function getWeatherHistory(
  type: string,
  lat: string,
  lon: string,
  start: string,
  end: string
) {
  const historyResponse = await fetch(
    `${OIKOLAB_BASE_URL}?param=${type}&lat=${lat}&lon=${lon}&start=${start}&end=${end}&api-key=${OIKOLAB_TOKEN}`
  );
  const historyData = await historyResponse.json();
  console.log(historyData);
  return historyData;
}
