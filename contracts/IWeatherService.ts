export enum WeatherUnit {
  C = "celsius",
  F = "fahrenheit",
}

export type GetWeatherResponse = {
  city: string;
  temperature: number;
  unit: WeatherUnit;
  country?: string;
};
export type GetWeatherRequest = {
  city: string;
  unit?: WeatherUnit;
};

export interface IWeatherService {
  getWeather(request: GetWeatherRequest): Promise<GetWeatherResponse>;
}
