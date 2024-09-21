import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './page';
import { useCurrentWeather, useForecastWeather } from '@/hooks';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock('@/hooks', () => ({
  useCurrentWeather: jest.fn(),
  useForecastWeather: jest.fn(),
}));

jest.mock('@/components/features/LocationSearchBar', () => {
  return function DummyLocationSearchBar({ onSearch }: { onSearch: (q: string) => void }) {
    return <input data-testid="search-bar" onChange={(e) => onSearch(e.target.value)} />;
  };
});

jest.mock('@/components/features/CurrentWeatherDisplay', () => {
  return function DummyCurrentWeatherDisplay() {
    return <div data-testid="current-weather">Current Weather</div>;
  };
});

jest.mock('@/components/features/ForecastWeatherDisplay', () => {
  return function DummyForecastWeatherDisplay() {
    return <div data-testid="forecast-weather">Forecast Weather</div>;
  };
});

describe('Home Page', () => {
  const mockOnCurrentSearch = jest.fn();
  const mockOnForecastSearch = jest.fn();

  beforeEach(() => {
    (useCurrentWeather as jest.Mock).mockReturnValue({
      weather: null,
      onSearch: jest.fn(),
      isLoading: false,
      error: null,
    });
    (useForecastWeather as jest.Mock).mockReturnValue({
      forecast: null,
      onSearch: jest.fn(),
      isLoading: false,
      error: null,
    });
  });

  // ページが正しくレンダリングされるか
  it('renders the page correctly', () => {
    render(<Home searchParams={{}} />);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });

  // 天気データがロードされたときに正しく表示されるか
  it('displays weather data when loaded', () => {
    (useCurrentWeather as jest.Mock).mockReturnValue({
      weather: { location: { name: 'Tokyo' }, current: {} },
      onSearch: mockOnCurrentSearch,
      isLoading: false,
      error: null,
    });
    (useForecastWeather as jest.Mock).mockReturnValue({
      forecast: { location: { name: 'Tokyo' }, forecast: {} },
      onSearch: mockOnForecastSearch,
      isLoading: false,
      error: null,
    });

    render(<Home searchParams={{}} />);
    expect(screen.getByTestId('current-weather')).toBeInTheDocument();
    expect(screen.getByTestId('forecast-weather')).toBeInTheDocument();
  });

  // ローディング状態が正しく表示されるか
  it('displays loading state', () => {
    (useCurrentWeather as jest.Mock).mockReturnValue({
      weather: null,
      onSearch: jest.fn(),
      isLoading: true,
      error: null,
    });

    render(<Home searchParams={{}} />);
    expect(screen.getByText('天気情報を読み込み中...')).toBeInTheDocument();
  });

  // エラー状態が正しく表示されるか
  it('displays error state', () => {
    (useCurrentWeather as jest.Mock).mockReturnValue({
      weather: null,
      onSearch: jest.fn(),
      isLoading: false,
      error: new Error('Failed to fetch'),
    });

    render(<Home searchParams={{}} />);
    expect(screen.getByText('エラーが発生しました。もう一度お試しください。')).toBeInTheDocument();
  });
});
