import dotenv from 'dotenv'
dotenv.config()

// eslint-disable-next-line no-undef
const API_TOKEN = 'complete me'
const BASE_URL = 'https://api.oikolab.com/weather'

const HistoryWeatherAPI = {
  async getWeatherHistory(location: string, start: string, end: string) {
    return fetch(
      `${BASE_URL}?param=temperature&location=${encodeURIComponent(location)}&start=${start}&end=${end}`,
      {
        headers: { 'api-key': API_TOKEN },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        return data
      })
  },
}
//WeatherAPI.getWeather("Barcelona");

export default HistoryWeatherAPI
