'use client';

import { fetcher } from '@/lib/api';
import { SpecificDayResponse } from '@/types/weather';
import useSWR from 'swr';
import { useWeatherQuery } from '@/hooks';

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
const FORECAST_DAYS_LIMIT = 14;
const API_ENDPOINTS = {
  FORECAST: '/forecast.json',
  FUTURE: '/future.json',
};

const useSpecificDayWeather = (q: string, dt: string) => {
  const { getQueryString } = useWeatherQuery();

  const today = new Date();
  const specificDate = new Date(dt);
  const diffDays = Math.ceil((specificDate.getTime() - today.getTime()) / MILLISECONDS_PER_DAY);

  let apiUrl = '';
  if (diffDays > FORECAST_DAYS_LIMIT) {
    apiUrl = API_ENDPOINTS.FUTURE;
  } else {
    apiUrl = API_ENDPOINTS.FORECAST;
  }

  const { data, error, isLoading } = useSWR(
    q ? [apiUrl, { q: getQueryString(q), dt }] : null,
    async ([url, params]) => await fetcher<SpecificDayResponse>(url, params),
    {
      refreshInterval: 300000,
    }
  );

  return { weather: data, isLoading, error };
};

export default useSpecificDayWeather;
