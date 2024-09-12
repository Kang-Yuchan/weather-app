import { renderHook, act } from '@testing-library/react';
import useSearchKeyboardNavigation from './useSearchKeyboardNavigation';
import { KeyboardEvent } from 'react';
import { mockSuggestions } from '@/lib/mockData';

describe('useSearchKeyboardNavigation', () => {
  const mockSetIsFocused = jest.fn();
  const mockOnSelect = jest.fn();
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = () =>
    renderHook(() =>
      useSearchKeyboardNavigation({
        setIsFocused: mockSetIsFocused,
        suggestions: mockSuggestions,
        onSelect: mockOnSelect,
        onSearch: mockOnSearch,
      })
    );

  it('initializes with correct default values', () => {
    const { result } = setup();
    expect(result.current.selectedIndex).toBe(-1);
  });

  it('handles ArrowDown key press', () => {
    const { result } = setup();

    act(() => {
      result.current.handleKeyDown({
        key: 'ArrowDown',
        preventDefault: jest.fn(),
        nativeEvent: { isComposing: false },
      } as unknown as KeyboardEvent<HTMLInputElement>);
    });

    expect(result.current.selectedIndex).toBe(0);
  });

  it('handles ArrowUp key press', () => {
    const { result } = setup();

    // 最初に下に移動
    act(() => {
      result.current.handleKeyDown({
        key: 'ArrowDown',
        preventDefault: jest.fn(),
        nativeEvent: { isComposing: false },
      } as unknown as KeyboardEvent<HTMLInputElement>);
    });
    // 下に移動
    act(() => {
      result.current.handleKeyDown({
        key: 'ArrowDown',
        preventDefault: jest.fn(),
        nativeEvent: { isComposing: false },
      } as unknown as KeyboardEvent<HTMLInputElement>);
    });

    // 下に移動
    act(() => {
      result.current.handleKeyDown({
        key: 'ArrowDown',
        preventDefault: jest.fn(),
        nativeEvent: { isComposing: false },
      } as unknown as KeyboardEvent<HTMLInputElement>);
    });

    // 最後に上に移動
    act(() => {
      result.current.handleKeyDown({
        key: 'ArrowUp',
        preventDefault: jest.fn(),
        nativeEvent: { isComposing: false },
      } as unknown as KeyboardEvent<HTMLInputElement>);
    });

    expect(result.current.selectedIndex).toBe(1);
  });

  it('handles Enter key press with selection', () => {
    const { result } = setup();

    // 選択を移動
    act(() => {
      result.current.handleKeyDown({
        key: 'ArrowDown',
        preventDefault: jest.fn(),
        nativeEvent: { isComposing: false },
      } as unknown as KeyboardEvent<HTMLInputElement>);
    });

    // Enterを押す
    act(() => {
      result.current.handleKeyDown({
        key: 'Enter',
        preventDefault: jest.fn(),
        nativeEvent: { isComposing: false },
      } as unknown as KeyboardEvent<HTMLInputElement>);
    });

    expect(mockOnSelect).toHaveBeenCalledWith(mockSuggestions[result.current.selectedIndex]);
    expect(mockSetIsFocused).toHaveBeenCalledWith(false);
  });

  it('handles Enter key press without selection', () => {
    const { result } = setup();

    act(() => {
      result.current.handleKeyDown({
        key: 'Enter',
        preventDefault: jest.fn(),
        nativeEvent: { isComposing: false },
      } as unknown as KeyboardEvent<HTMLInputElement>);
    });

    expect(mockOnSearch).toHaveBeenCalled();
    expect(mockSetIsFocused).toHaveBeenCalledWith(false);
  });

  it('handles Escape key press', () => {
    const { result } = setup();

    act(() => {
      result.current.handleKeyDown({
        key: 'Escape',
        preventDefault: jest.fn(),
        nativeEvent: { isComposing: false },
      } as unknown as KeyboardEvent<HTMLInputElement>);
    });

    expect(mockSetIsFocused).toHaveBeenCalledWith(false);
    expect(result.current.selectedIndex).toBe(-1);
  });

  it('does not process keys when isComposing is true', () => {
    const { result } = setup();

    act(() => {
      result.current.handleKeyDown({
        key: 'Enter',
        preventDefault: jest.fn(),
        nativeEvent: { isComposing: true },
      } as unknown as KeyboardEvent<HTMLInputElement>);
    });

    expect(mockOnSearch).not.toHaveBeenCalled();
    expect(mockSetIsFocused).not.toHaveBeenCalled();
  });
});
