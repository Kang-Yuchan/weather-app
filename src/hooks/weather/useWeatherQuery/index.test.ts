import { renderHook, act } from '@testing-library/react';
import { useWeatherQuery } from '@/hooks';

describe('useWeatherQuery', () => {
  // hookの初期状態が正しく設定されているか
  it('initializes with empty query', () => {
    const { result } = renderHook(() => useWeatherQuery());

    expect(result.current.query).toBe('');
  });

  // 地域名での検索が正しく機能するか
  it('handles city name search correctly', () => {
    const { result } = renderHook(() => useWeatherQuery());

    act(() => {
      result.current.onSearch('Tokyo');
    });

    expect(result.current.query).toBe('Tokyo');
  });

  // 緯度経度での検索が正しく機能するか
  it('handles latitude and longitude search correctly', () => {
    const { result } = renderHook(() => useWeatherQuery());

    act(() => {
      result.current.onSearch('35.6895, 139.6917');
    });

    expect(result.current.query).toEqual({ lat: '35.6895', lon: '139.6917' });
  });

  // getQueryStringが正しく機能するか（地域名）
  it('getQueryString returns correct string for city name', () => {
    const { result } = renderHook(() => useWeatherQuery());

    act(() => {
      result.current.onSearch('Tokyo');
    });

    expect(result.current.getQueryString(result.current.query)).toBe('Tokyo');
  });

  // getQueryStringが正しく機能するか（緯度経度）
  it('getQueryString returns correct string for lat/lon', () => {
    const { result } = renderHook(() => useWeatherQuery());

    act(() => {
      result.current.onSearch('35.6895, 139.6917');
    });

    expect(result.current.getQueryString(result.current.query)).toBe('35.6895,139.6917');
  });

  // 無効な入力を適切に処理するか
  it('handles invalid input correctly', () => {
    const { result } = renderHook(() => useWeatherQuery());

    act(() => {
      result.current.onSearch('Invalid, Input');
    });

    expect(result.current.query).toBe('Invalid, Input');
  });
});
