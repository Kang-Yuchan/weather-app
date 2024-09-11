import { useState, useRef, useCallback, useEffect, KeyboardEvent } from 'react';

type UseSearchKeyboardNavigationProps = {
  setIsFocused: (bool: boolean) => void;
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  onSearch: () => void;
};

const useSearchKeyboardNavigation = ({
  setIsFocused,
  suggestions,
  onSelect,
  onSearch,
}: UseSearchKeyboardNavigationProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      // 入力中（未確定）の場合は処理をスキップ
      if (e.nativeEvent.isComposing) return;
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (selectedIndex < suggestions.length - 1) {
            setSelectedIndex((prev) => prev + 1);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (selectedIndex !== 0) {
            setSelectedIndex((prev) => prev - 1);
          }
          break;
        case 'Enter':
          e.preventDefault();
          // 入力が確定している場合のみ処理を実行
          if (!e.nativeEvent.isComposing) {
            setIsFocused(false);
            if (selectedIndex >= 0) {
              onSelect(suggestions[selectedIndex]);
            } else {
              onSearch();
            }
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsFocused(false);
          setSelectedIndex(-1);
          break;
      }
    },
    [setIsFocused, suggestions, selectedIndex, onSelect]
  );

  useEffect(() => {
    if (
      selectedIndex >= 0 &&
      suggestionsRef.current &&
      suggestionsRef.current.children.length > selectedIndex
    ) {
      const selectedElement = suggestionsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement && typeof selectedElement.scrollIntoView === 'function') {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return {
    selectedIndex,
    setSelectedIndex,
    inputRef,
    suggestionsRef,
    handleKeyDown,
  };
};

export default useSearchKeyboardNavigation;
