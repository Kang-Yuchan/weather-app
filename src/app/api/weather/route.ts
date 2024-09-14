import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    lang: 'ja',
  },
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');
  const params = Object.fromEntries(searchParams.entries());
  delete params.path;

  try {
    const response = await apiClient.get(path as string, { params });
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Axiosのエラーの場合
      const axiosError = error as AxiosError;
      return NextResponse.json(
        { error: `Error fetching weather data: ${axiosError.message}` },
        { status: axiosError.response?.status || 500 }
      );
    } else {
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}
