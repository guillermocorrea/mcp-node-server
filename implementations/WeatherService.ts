import { ILogger } from "../contracts/ILogger";
import {
  GetWeatherRequest,
  GetWeatherResponse,
  IWeatherService,
  WeatherUnit,
} from "../contracts/IWeatherService";

export class WeatherService implements IWeatherService {
  constructor(private readonly logger: ILogger) {}

  async getWeather(request: GetWeatherRequest): Promise<GetWeatherResponse> {
    const { city, unit = WeatherUnit.C } = request;

    // Fetch geolocation data
    const { lat, lon, country } = await this.geoLocate(city);
    this.logger.log(`Geolocation data: ${lat}, ${lon}, ${country}`);

    // Fetch weather data
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=${unit}`;
    this.logger.log(`Weather API URL: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    return {
      city,
      country,
      temperature: data.current_weather.temperature,
      unit: unit,
    };
  }

  private async geoLocate(
    city: string
  ): Promise<{ lat: number; lon: number; country: string }> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
    this.logger.log(`Geolocation API URL: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch geolocation data");
    }
    const data = (await response.json()).results;
    this.logger.log(`Geolocation data: ${JSON.stringify(data)}`);
    if (data.length === 0) {
      throw new Error("City not found");
    }
    return {
      lat: data[0].latitude,
      lon: data[0].longitude,
      country: data[0].country,
    };
  }
}
