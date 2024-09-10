import axios, { AxiosResponse } from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    lang: 'ja',
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetcher = <T>(path: string, params?: Record<string, any>): Promise<T> =>
  apiClient.get(path, { params }).then((res: AxiosResponse<T>) => res.data);
