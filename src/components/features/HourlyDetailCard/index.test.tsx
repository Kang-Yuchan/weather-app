import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { mockHourData } from '@/lib/mockData';
import HoulyItemCard from '@/components/features/HourlyDetailCard';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: JSX.IntrinsicElements['img']) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

describe('HoulyItemCard Component', () => {
  const mockHandleHourClick = jest.fn();

  // 時間、天気アイコン、気温が正しく表示されているか
  it('renders correctly with provided hour data', () => {
    render(<HoulyItemCard item={mockHourData} handleHourClick={mockHandleHourClick} />);

    expect(screen.getByText('00:00')).toBeInTheDocument();

    const weatherIcon = screen.getByAltText('快晴');
    expect(weatherIcon).toBeInTheDocument();
    expect(weatherIcon).toHaveAttribute(
      'src',
      'https://cdn.weatherapi.com/weather/64x64/night/113.png'
    );

    expect(screen.getByText('28.7°C')).toBeInTheDocument();
  });
  // クリックイベントが正しく動作し、ハンドラ関数が呼び出されるか
  it('calls handleHourClick when clicked', () => {
    render(<HoulyItemCard item={mockHourData} handleHourClick={mockHandleHourClick} />);

    const hourItem = screen.getByText('00:00').closest('div');
    fireEvent.click(hourItem!);

    expect(mockHandleHourClick).toHaveBeenCalledTimes(1);
    expect(mockHandleHourClick).toHaveBeenCalledWith(mockHourData);
  });
});
