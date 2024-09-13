import { renderHook } from '@testing-library/react';
import { useSpecificDayWeather } from '@/hooks';
import useSWR from 'swr';

jest.mock('swr');
const useSWRMock = useSWR as jest.Mock;

describe('useSpecificDayWeather', () => {
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

    const { result } = renderHook(() => useSpecificDayWeather('Tokyo', '2023-09-14'));

    expect(result.current.weather).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  // 正しいAPIエンドポイントを使用しているか（14日以内）
  it('uses forecast endpoint for dates within 14 days', () => {
    const today = new Date();
    const futureDate = new Date(today.getTime() + 13 * 24 * 60 * 60 * 1000);
    const futureDateString = futureDate.toISOString().split('T')[0];

    renderHook(() => useSpecificDayWeather('Tokyo', futureDateString));

    expect(useSWRMock).toHaveBeenCalledWith(
      expect.arrayContaining(['/forecast.json']),
      expect.any(Function),
      expect.any(Object)
    );
  });

  // 正しいAPIエンドポイントを使用しているか（14日以降）
  it('uses future endpoint for dates beyond 14 days', () => {
    const today = new Date();
    const futureDate = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000);
    const futureDateString = futureDate.toISOString().split('T')[0];

    renderHook(() => useSpecificDayWeather('Tokyo', futureDateString));

    expect(useSWRMock).toHaveBeenCalledWith(
      expect.arrayContaining(['/future.json']),
      expect.any(Function),
      expect.any(Object)
    );
  });

  // エラー発生時に正しくエラーの動作がされてるか
  it('handles error state', () => {
    const mockError = new Error('Fetch failed');
    useSWRMock.mockReturnValue({
      data: undefined,
      error: mockError,
      isLoading: false,
    });

    const { result } = renderHook(() => useSpecificDayWeather('Tokyo', '2023-09-14'));

    expect(result.current.error).toBe(mockError);
  });

  // ローディング状態を正しく処理するか
  it('handles loading state', () => {
    useSWRMock.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    const { result } = renderHook(() => useSpecificDayWeather('Tokyo', '2023-09-14'));

    expect(result.current.isLoading).toBe(true);
  });
});
