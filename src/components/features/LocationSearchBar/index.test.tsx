import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LocationSearchBar from './index';
import { useLocationSearch, useSearchKeyboardNavigation } from '@/hooks';

jest.mock('@/hooks', () => ({
  useLocationSearch: jest.fn(),
  useSearchKeyboardNavigation: jest.fn(),
}));

describe('LocationSearchBar', () => {
  const mockOnSearch = jest.fn();
  const mockSetQuery = jest.fn();
  const mockSuggestions = ['Tokyo', 'Toronto', 'Tolyatti'];

  // hooksの初期リターン値を設定
  beforeEach(() => {
    jest.clearAllMocks();
    (useLocationSearch as jest.Mock).mockReturnValue({
      setQuery: mockSetQuery,
      suggestions: mockSuggestions,
      isLoading: false,
      error: null,
    });
    (useSearchKeyboardNavigation as jest.Mock).mockReturnValue({
      selectedIndex: -1,
      inputRef: { current: null },
      suggestionsRef: { current: null },
      handleKeyDown: jest.fn(),
    });
  });
  // LocationSearchBarが正しくレンダリングされてるか
  it('renders correctly', () => {
    render(<LocationSearchBar onSearch={mockOnSearch} placeholder="地域名で検索" />);
    expect(screen.getByPlaceholderText('地域名で検索')).toBeInTheDocument();
  });
  // 入力値が更新され、setQueryが正しく呼び出されることを検証します
  it('updates input value and calls setQuery on change', async () => {
    render(<LocationSearchBar onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, '東京都');
    expect(mockSetQuery).toHaveBeenCalledWith('東京都');
  });
});
