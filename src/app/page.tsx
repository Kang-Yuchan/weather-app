'use client';

import Layout from '@/components/Layout';
import styles from './page.module.scss';
import LocationSearchBar from '@/components/features/LocationSearchBar';
import { useCurrentWeather, useForecastWeather } from '@/hooks';
import CurrentWeatherDisplay from '@/components/features/CurrentWeatherDisplay';
import ForecastWeatherDisplay from '@/components/features/ForecastWeatherDisplay';

export default function Home() {
  const {
    weather,
    onSearch: onCurrentSearch,
    isLoading: isCurrentLoading,
    error: currentError,
  } = useCurrentWeather();
  const {
    forecast,
    onSearch: onForecastSearch,
    isLoading: isForecastLoading,
    error: forecastError,
  } = useForecastWeather();

  const onSearch = (q: string) => {
    onCurrentSearch(q);
    onForecastSearch(q);
  };

  const error = currentError || forecastError;
  const isLoading = isCurrentLoading || isForecastLoading;

  return (
    <Layout title="天気アプリケーション">
      <LocationSearchBar
        onSearch={onSearch}
        className={styles.searchBar}
        placeholder="地名または緯度,経度で検索"
      />
      {isLoading && <p className={styles.message}>天気情報を読み込み中...</p>}
      {error && <p className={styles.message}>エラーが発生しました。もう一度お試しください。</p>}
      {weather && forecast && (
        <div className={styles.weatherWrapper}>
          {<CurrentWeatherDisplay weather={weather} />}
          {<ForecastWeatherDisplay forecast={forecast} />}
        </div>
      )}
    </Layout>
  );
}
