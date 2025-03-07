import weatherAndEnvironmentAPIs from '../routes/current-weather-api'

export async function getCurrentWeather(req, res) {
  const { cityname } = req.body
  const currentWeather =
    await weatherAndEnvironmentAPIs.getCurrentWeather(cityname)
  res.json(currentWeather)
}
