'use client';

import Layout from '@/components/Layout';
import styles from './page.module.scss';
import LocationSearchBar from '@/components/features/LocationSearchBar';
import { formatDate } from '@/lib/format';
import useSpecificDayWeather from '@/hooks/weather/useSpecificDayWeather';
import SpecificDayWeatherDisplay from '@/components/features/SpecificDayWeatherDisplay';

type SpecificDayWeatherProps = { params: { date: string } };

export default function SpecificDayWeather({ params }: SpecificDayWeatherProps) {
  const { weather, onSearch, isLoading, error } = useSpecificDayWeather(params.date);
  const formattedDate = formatDate(params.date);

  return (
    <Layout title={formattedDate}>
      <LocationSearchBar
        onSearch={onSearch}
        className={styles.searchBar}
        placeholder="地名または緯度,経度で検索"
      />
      {isLoading && <p className={styles.message}>天気情報を読み込み中...</p>}
      {error && <p className={styles.message}>エラーが発生しました。もう一度お試しください。</p>}
      {weather && <SpecificDayWeatherDisplay weather={weather} />}
    </Layout>
  );
}
