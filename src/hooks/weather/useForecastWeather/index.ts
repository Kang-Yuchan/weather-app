'use client';

import { fetcher } from '@/lib/api';
import { ForecastResponse } from '@/types/weather';
import useSWR from 'swr';
import { useWeatherQuery } from '@/hooks';

const useForecastWeather = () => {
  const { query, onSearch, getQueryString } = useWeatherQuery();

  const { data, error, isLoading } = useSWR(
    query ? [`/forecast.json`, { q: getQueryString(query), days: 7 }] : null,
    async ([url, params]) => await fetcher<ForecastResponse>(url, params),
    {
      refreshInterval: 300000,
    }
  );

  return { forecast: data, onSearch, isLoading, error };
};

export default useForecastWeather;
