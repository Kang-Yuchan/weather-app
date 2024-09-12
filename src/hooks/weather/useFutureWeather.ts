'use client';

import { fetcher } from '@/lib/api';
import { FutureResponse } from '@/types/weather';
import useSWR from 'swr';
import { useWeatherQuery } from '@/hooks';

const useFutureWeather = (dt: string) => {
  const { query, onSearch, getQueryString } = useWeatherQuery();

  const { data, error, isLoading } = useSWR(
    query ? [`/future.json`, { q: getQueryString(query), dt }] : null,
    async ([url, params]) => await fetcher<FutureResponse>(url, params),
    {
      refreshInterval: 300000,
    }
  );

  return { weather: data, onSearch, isLoading, error };
};

export default useFutureWeather;
