import { renderHook, act } from '@testing-library/react';
import { useCurrentWeather } from '@/hooks';
import { mockCurrentWeather } from '@/lib/mockData';
import useSWR from 'swr';

jest.mock('swr');
const useSWRMock = useSWR as jest.Mock;

describe('useCurrentWeather', () => {
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

    const { result } = renderHook(() => useCurrentWeather());

    expect(result.current.weather).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  // 検索が正しく機能するか
  it('performs search correctly', async () => {
    useSWRMock.mockReturnValue({
      data: mockCurrentWeather,
      error: undefined,
      isLoading: false,
    });

    const { result } = renderHook(() => useCurrentWeather());

    act(() => {
      result.current.onSearch('Tokyo');
    });

    // SWRの非同期動作をシミュレート
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.weather).toEqual(mockCurrentWeather);
  });

  // エラー発生時に正しくエラーの動作がされてるか
  it('handles error state', () => {
    const mockError = new Error('Fetch failed');
    useSWRMock.mockReturnValue({
      data: undefined,
      error: mockError,
      isLoading: false,
    });

    const { result } = renderHook(() => useCurrentWeather());

    expect(result.current.error).toBe(mockError);
  });

  // ローディング状態を正しく処理するか
  it('handles loading state', () => {
    useSWRMock.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    const { result } = renderHook(() => useCurrentWeather());

    expect(result.current.isLoading).toBe(true);
  });
});
