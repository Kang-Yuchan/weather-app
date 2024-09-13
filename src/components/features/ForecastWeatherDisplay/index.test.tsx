import React from 'react';
import { render, screen } from '@testing-library/react';
import ForecastWeatherDisplay from '@/components/features/ForecastWeatherDisplay';
import { mockForecastWeather } from '@/lib/mockData';
import { ForecastResponse } from '@/types/weather';

jest.mock('@/components/features/DayForecastCard', () => {
  const MockDayForecastCard = () => <div>Mocked DayForecastCard</div>;
  MockDayForecastCard.displayName = 'DayForecastCard';
  return MockDayForecastCard;
});

describe('ForecastWeatherDisplay Component', () => {
  const location = 'Tokyo';
  // DayForecastCardが7日間分正しくレンダリングされてるか
  it('renders correctly with provided forecast data', () => {
    render(<ForecastWeatherDisplay location={location} forecast={mockForecastWeather} />);

    expect(screen.getByText('7日間の天気予報')).toBeInTheDocument();
    expect(screen.getAllByText('Mocked DayForecastCard')).toHaveLength(7);
  });
  // 天気情報がない時はnullを返すようになっているか
  it('returns null when forecast.forecast is not provided', () => {
    const { container } = render(
      <ForecastWeatherDisplay location={location} forecast={{} as ForecastResponse} />
    );
    expect(container.firstChild).toBeNull();
  });
});
