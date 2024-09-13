'use client';

import { WeatherQuery } from '@/types/weather';
import { useState, useCallback } from 'react';

const useWeatherQuery = () => {
  const [query, setQuery] = useState<WeatherQuery>('');

  const onSearch = useCallback((q: string) => {
    const trimmedQuery = q.trim();
    const latLonMatch = trimmedQuery.match(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/);

    if (latLonMatch) {
      const [, lat, , lon] = latLonMatch;
      setQuery({ lat, lon });
    } else {
      setQuery(trimmedQuery);
    }
  }, []);

  const getQueryString = useCallback((query: WeatherQuery) => {
    if (typeof query === 'string') {
      return query;
    }
    return `${query.lat},${query.lon}`;
  }, []);

  return { query, onSearch, getQueryString };
};

export default useWeatherQuery;
