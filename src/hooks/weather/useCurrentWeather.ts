'use client';

import { useWeatherQuery } from '@/hooks';
import { fetcher } from '@/lib/api';
import { WeatherResponse } from '@/types/weather';
import useSWR from 'swr';

const useCurrentWeather = () => {
  const { query, onSearch, getQueryString } = useWeatherQuery();

  const { data, error, isLoading } = useSWR(
    query ? [`/current.json`, { q: getQueryString(query) }] : null,
    async ([url, params]) => await fetcher<WeatherResponse>(url, params),
    {
      refreshInterval: 300000,
    }
  );

  return { weather: data, onSearch, isLoading, error };
};

export default useCurrentWeather;
