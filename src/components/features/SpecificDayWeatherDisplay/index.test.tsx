import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { mockSpecificDayWeather } from '@/lib/mockData';
import SpecificDayWeatherDisplay from '@/components/features/SpecificDayWeatherDisplay';

// next/imageのモックは省略

jest.mock('@/components/ui/DetailItem', () => {
  return function MockDetailItem({
    datail,
  }: {
    datail: {
      label: string;
      value: string | number;
      unit?: string;
    };
  }) {
    return <div data-testid="detail-item">{`${datail.label}: ${datail.value}`}</div>;
  };
});

jest.mock('@/components/features/HourlyDetailCard', () => {
  return function MockHoulyItemCard({
    item,
    handleHourClick,
  }: {
    item: { time: string };
    handleHourClick: (item: { time: string }) => void;
  }) {
    return (
      <div data-testid="hourly-item" onClick={() => handleHourClick(item)}>
        {item.time}
      </div>
    );
  };
});

describe('SpecificDayWeatherDisplay Component', () => {
  // コンポーネントが正しくレンダリングされ、主要な情報が表示されているか
  it('renders correctly with provided weather data', () => {
    render(<SpecificDayWeatherDisplay weather={mockSpecificDayWeather} />);

    expect(screen.getByText('Tokyo, Japan')).toBeInTheDocument();
    expect(screen.getByText('30°C')).toBeInTheDocument();
    expect(screen.getByText('近くで所により雨')).toBeInTheDocument();
  });

  // 全てのDetailItemが正しく表示されているか
  it('displays all DetailItems correctly', () => {
    render(<SpecificDayWeatherDisplay weather={mockSpecificDayWeather} />);

    const detailItems = screen.getAllByTestId('detail-item');
    // dayDetails (11) + astroDetails (6) + selectedHour details (9) = 26
    expect(detailItems).toHaveLength(26);

    // 1日の概要セクションの確認
    expect(screen.getByText('1日の概要')).toBeInTheDocument();
    expect(screen.getByText('最高気温 (°C): 32.7')).toBeInTheDocument();

    // 天文情報セクションの確認
    expect(screen.getByText('天文情報')).toBeInTheDocument();
    expect(screen.getByText('日の出: 05:23 AM')).toBeInTheDocument();

    // 選択された時間の詳細の確認（デフォルトで最初の時間が選択されている）
    expect(screen.getByText('選択時間の詳細: 00:00')).toBeInTheDocument();
    expect(screen.getByText('気温 (°C): 28.7')).toBeInTheDocument();
  });

  // 時間ごとの詳細が正しく表示され、クリックイベントが機能するか
  it('displays hourly details and handles hour selection', () => {
    render(<SpecificDayWeatherDisplay weather={mockSpecificDayWeather} />);

    expect(screen.getByText('時間ごとの詳細')).toBeInTheDocument();
    const hourlyItems = screen.getAllByTestId('hourly-item');
    expect(hourlyItems).toHaveLength(24);

    fireEvent.click(hourlyItems[12]); // 12:00の時間を選択
    expect(
      screen.getByText(
        (content, _) => content.includes('選択時間の詳細:') && content.includes('12:00')
      )
    ).toBeInTheDocument();
  });
});
