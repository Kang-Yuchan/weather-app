import React from 'react';
import { render, screen } from '@testing-library/react';
import DayForecastCard from '@/components/features/DayForecastCard';
import { mockForecastDay } from '@/lib/mockData';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: JSX.IntrinsicElements['img']) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: (props: JSX.IntrinsicElements['a']) => {
    return (
      <a href={props.href} {...props}>
        {props.children}
      </a>
    );
  },
}));

describe('DayForecastCard Component', () => {
  const location = 'Tokyo';
  // 細かな要素が正しくレンダリングされてるか
  it('renders correctly with provided forecast data', () => {
    render(<DayForecastCard location={location} day={mockForecastDay} />);

    expect(screen.getByText('9/14(土)')).toBeInTheDocument();

    const weatherIcon = screen.getByAltText('所により曇り');
    expect(weatherIcon).toBeInTheDocument();
    expect(weatherIcon).toHaveAttribute(
      'src',
      'https://cdn.weatherapi.com/weather/64x64/day/116.png'
    );

    expect(screen.getByText('33°')).toBeInTheDocument();
    expect(screen.getByText('28°')).toBeInTheDocument();

    expect(screen.getByText('所により曇り')).toBeInTheDocument();
  });
  // link先が正しく設定されてるか
  it('creates a correct link to the specific day forecast', () => {
    render(<DayForecastCard location={location} day={mockForecastDay} />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/specific_day/Tokyo/2024-09-14');
  });
});
