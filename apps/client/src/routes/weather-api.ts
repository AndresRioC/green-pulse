import dotenv from 'dotenv'
dotenv.config()

export async function getCurrentWeather(cityname: string) {
  const weatherResponse = await fetch(
    `${process.env.OPENWEATHER_BASE_URL}weather?q=${cityname}&appid=${process.env.OPENWEATHER_TOKEN}`
  )
  const weatherData = await weatherResponse.json()
  console.log(weatherData)
  const airResponse = await fetch(
    `${process.env.OPENWEATHER_BASE_URL}air_pollution?lat=${weatherData.corod.lat}&lon=${weatherData.corod.lon}&appid=${process.env.OPENWEATHER_TOKEN}`
  )
  const airData = await airResponse.json()
  console.log(airData)
  const data: object = { ...weatherData, ...airData }
  console.log(data)
  return data
}

export async function getWeatherHistory(
  type: string,
  lat: string,
  lon: string,
  start: string,
  end: string
) {
  const historyResponse = await fetch(
    `${process.env.OIKOLAB_BASE_URL}?param=${type}&lat=${lat}&lon=${lon}&start=${start}&end=${end}&api-key=${process.env.OIKOLAB_TOKEN}`
  )
  const historyData = await historyResponse.json()
  console.log(historyData)
  return historyData
}
