import { renderHook, act } from '@testing-library/react';
import useLocationSearch from './useLocationSearch';
import useSWR from 'swr';
import { mockSearchLocationData } from '@/lib/mockData';

// SWRをモック
jest.mock('swr');

const useSWRmock = useSWR as jest.Mock;

describe('useLocationSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // hookの初期状態が正しく設定されてるか
  it('initializes hook with default values', () => {
    useSWRmock.mockReturnValue({
      data: [],
      error: undefined,
      isLoading: false,
    });

    const { result } = renderHook(() => useLocationSearch());

    expect(result.current.suggestions).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(undefined);
  });
  // query更新時に合わせて地域名のsuggestが正しく取得されてるか
  it('updates query and fetch suggestions', async () => {
    useSWRmock.mockReturnValue({
      data: mockSearchLocationData,
      error: undefined,
      isLoading: false,
    });

    const { result } = renderHook(() => useLocationSearch());

    act(() => {
      result.current.setQuery('To');
    });

    // SWRの非同期動作をシミュレート
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.suggestions).toEqual(['Tokyo', 'Toronto', 'Tolyatti', 'Touba', 'Toluca']);
    expect(result.current.isLoading).toBe(false);
  });
  // エラー発生時に正しくエラーの動作がされてるか
  it('handles fetch error', async () => {
    const mockError = new Error('Fetch failed');

    useSWRmock.mockReturnValue({
      data: [],
      error: mockError,
      isLoading: false,
    });

    const { result } = renderHook(() => useLocationSearch());

    act(() => {
      result.current.setQuery('Error');
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBe(mockError);
    expect(result.current.isLoading).toBe(false);
  });

  it('handles loading state correctly', () => {
    useSWRmock.mockReturnValue({
      data: [],
      error: null,
      isLoading: true,
    });
    // ローディング状態の処理が正しくされてるか
    const { result } = renderHook(() => useLocationSearch());
    expect(result.current.isLoading).toBe(true);
  });
});
