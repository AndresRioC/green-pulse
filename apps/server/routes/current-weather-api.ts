import dotenv from 'dotenv'
dotenv.config()

// eslint-disable-next-line no-undef
const API_TOKEN = 'complete me'
const BASE_URL = 'http://api.openweathermap.org/data/2.5/'

const weatherAndEnvironmentAPIs = {
  async getCurrentWeather(cityname: string) {
    const weatherResponse = await fetch(
      `${BASE_URL}weather?q=${cityname}&appid=${API_TOKEN}`
    )
    const weatherData = await weatherResponse.json()
    console.log(weatherData)
    const airResponse = await fetch(
      `${BASE_URL}air_pollution?lat=${weatherData.corod.lat}&lon=${weatherData.corod.lon}&appid=${API_TOKEN}`
    )
    const airData = await airResponse.json()
    console.log(airData)
    const data: object = { ...weatherData, ...airData }
    console.log(data)
    return data
  },
  // async getHistoryWeather(lat, long, param) {
  //   return await 1
  // },
}

export default weatherAndEnvironmentAPIs
