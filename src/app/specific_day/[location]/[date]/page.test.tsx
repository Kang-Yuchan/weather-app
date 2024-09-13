import React from 'react';
import { render, screen } from '@testing-library/react';
import SpecificDayWeather from './page';
import { useSpecificDayWeather } from '@/hooks';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/hooks', () => ({
  useSpecificDayWeather: jest.fn(),
}));

jest.mock('@/components/features/LocationSearchBar', () => {
  return function DummyLocationSearchBar({ onSearch }: { onSearch: (q: string) => void }) {
    return <input data-testid="search-bar" onChange={(e) => onSearch(e.target.value)} />;
  };
});

jest.mock('@/components/features/SpecificDayWeatherDisplay', () => {
  return function DummySpecificDayWeatherDisplay() {
    return <div data-testid="specific-day-weather">Specific Day Weather</div>;
  };
});

describe('SpecificDayWeather Page', () => {
  const mockParams = { location: 'Tokyo', date: '2023-09-15' };

  beforeEach(() => {
    (useSpecificDayWeather as jest.Mock).mockReturnValue({
      weather: null,
      isLoading: false,
      error: null,
    });
  });

  // ページが正しくレンダリングされるか
  it('renders the page correctly', () => {
    render(<SpecificDayWeather params={mockParams} />);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });

  // 天気データがロードされたときに正しく表示されるか
  it('displays weather data when loaded', () => {
    (useSpecificDayWeather as jest.Mock).mockReturnValue({
      weather: { location: { name: 'Tokyo' }, forecast: {} },
      isLoading: false,
      error: null,
    });

    render(<SpecificDayWeather params={mockParams} />);
    expect(screen.getByTestId('specific-day-weather')).toBeInTheDocument();
  });

  // ローディング状態が正しく表示されるか
  it('displays loading state', () => {
    (useSpecificDayWeather as jest.Mock).mockReturnValue({
      weather: null,
      isLoading: true,
      error: null,
    });

    render(<SpecificDayWeather params={mockParams} />);
    expect(screen.getByText('天気情報を読み込み中...')).toBeInTheDocument();
  });

  // エラー状態が正しく表示されるか
  it('displays error state', () => {
    (useSpecificDayWeather as jest.Mock).mockReturnValue({
      weather: null,
      isLoading: false,
      error: new Error('Failed to fetch'),
    });

    render(<SpecificDayWeather params={mockParams} />);
    expect(screen.getByText('エラーが発生しました。もう一度お試しください。')).toBeInTheDocument();
  });
});
