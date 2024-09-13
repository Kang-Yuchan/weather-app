import { renderHook, act } from '@testing-library/react';
import { useForecastWeather } from '@/hooks';
import { mockForecastWeather } from '@/lib/mockData';
import useSWR from 'swr';

jest.mock('swr');
const useSWRMock = useSWR as jest.Mock;

describe('useForecastWeather', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // hookの初期状態が正しく設定されているか
  it('initializes with default values', () => {
    useSWRMock.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
    });

    const { result } = renderHook(() => useForecastWeather());

    expect(result.current.forecast).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  // 検索が正しく機能するか
  it('performs search correctly', async () => {
    useSWRMock.mockReturnValue({
      data: mockForecastWeather,
      error: undefined,
      isLoading: false,
    });

    const { result } = renderHook(() => useForecastWeather());

    act(() => {
      result.current.onSearch('Tokyo');
    });

    // SWRの非同期動作をシミュレート
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.forecast).toEqual(mockForecastWeather);
  });

  // エラー発生時に正しくエラーの動作がされてるか
  it('handles error state', () => {
    const mockError = new Error('Fetch failed');
    useSWRMock.mockReturnValue({
      data: undefined,
      error: mockError,
      isLoading: false,
    });

    const { result } = renderHook(() => useForecastWeather());

    expect(result.current.error).toBe(mockError);
  });

  // ローディング状態を正しく処理するか
  it('handles loading state', () => {
    useSWRMock.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    const { result } = renderHook(() => useForecastWeather());

    expect(result.current.isLoading).toBe(true);
  });
});
