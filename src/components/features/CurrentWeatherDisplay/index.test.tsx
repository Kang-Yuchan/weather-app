import React from 'react';
import { render, screen } from '@testing-library/react';
import { WeatherResponse } from '@/types/weather';
import CurrentWeatherDisplay from '@/components/features/CurrentWeatherDisplay';
import { mockCurrentWeather } from '@/lib/mockData';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: JSX.IntrinsicElements['img']) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

describe('CurrentWeatherDisplay Component', () => {
  // 細かな要素が正しくレンダリングされてるか
  it('renders correctly with provided weather data', () => {
    render(<CurrentWeatherDisplay weather={mockCurrentWeather} />);

    expect(screen.getByText('Tokyo, Japan')).toBeInTheDocument();
    expect(screen.getByText('28.1°C')).toBeInTheDocument();
    expect(screen.getByText('所により曇り')).toBeInTheDocument();

    const weatherIcon = screen.getByAltText('所により曇り');
    expect(weatherIcon).toBeInTheDocument();
    expect(weatherIcon).toHaveAttribute(
      'src',
      'https://cdn.weatherapi.com/weather/64x64/night/116.png'
    );

    expect(screen.getByText('気温 (°C):')).toBeInTheDocument();
    expect(screen.getByText('28.1')).toBeInTheDocument();
    expect(screen.getByText('湿度:')).toBeInTheDocument();
    expect(screen.getByText('70')).toBeInTheDocument();

    expect(screen.getByText('最終更新: 2024/9/14 1:15:00')).toBeInTheDocument();
  });
  // 昼夜の情報が正しくレンダリングされてるか
  it('displays day/night information correctly', () => {
    render(<CurrentWeatherDisplay weather={mockCurrentWeather} />);
    expect(screen.getByText('夜間')).toBeInTheDocument();
  });
  // 天気情報がない時はnullを返すようになっているか
  it('returns null when weather data is not provided', () => {
    const { container } = render(<CurrentWeatherDisplay weather={{} as WeatherResponse} />);
    expect(container.firstChild).toBeNull();
  });
});
