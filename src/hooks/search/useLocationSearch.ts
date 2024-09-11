'use client';

import { fetcher } from '@/lib/api';
import { LocationResponse } from '@/types/weather';
import { useState } from 'react';
import useSWR from 'swr';

const useLocationSearch = () => {
  const [query, setQuery] = useState('');
  const {
    data = [],
    error,
    isLoading,
  } = useSWR(
    query ? [`/search.json`, query] : null,
    async ([url, q]) => await fetcher<LocationResponse[]>(url, { q: `"${q}"` })
  );

  return {
    setQuery,
    suggestions: data.map((res) => res.name),
    isLoading,
    error,
  };
};

export default useLocationSearch;
