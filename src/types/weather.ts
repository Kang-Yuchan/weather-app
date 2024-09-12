export type WeatherResponse = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    humidity: number;
    last_updated_epoch: number;
    last_updated: string;
    is_day: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    heatindex_c: number;
    windchill_c: number;
    dewpoint_c: number;
    heatindex_f: number;
    windchill_f: number;
    dewpoint_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
};

export type ForecastResponse = WeatherResponse & {
  forecast: {
    forecastday: Array<ForecastDay>;
  };
};

export type ForecastDay = {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };
};

export type FutureResponse = Omit<ForecastResponse, 'current'>;

export type LocationResponse = {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
};

export type WeatherQuery = string | { lat: string; lon: string };
