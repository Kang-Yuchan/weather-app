import axios, { AxiosResponse } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetcher = <T>(path: string, params?: Record<string, any>): Promise<T> =>
  axios
    .get<T>(`/api/weather`, { params: { path, ...params } })
    .then((res: AxiosResponse<T>) => res.data);
