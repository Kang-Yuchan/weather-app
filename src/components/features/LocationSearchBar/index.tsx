import { useCallback, memo, useState } from 'react';
import classNames from 'classnames';
import Input from '@/components/ui/Input';
import styles from './index.module.scss';
import { useLocationSearch, useSearchKeyboardNavigation } from '@/hooks';

type SearchBarProps = {
  placeholder?: string;
  className?: string;
  onSearch: (query: string) => void;
};

const LocationSearchBar = ({ placeholder, className, onSearch }: SearchBarProps) => {
  const { setQuery, suggestions, isLoading, error } = useLocationSearch();
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setInputValue(suggestion);
      onSearch(suggestion);
    },
    [onSearch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setQuery(value);
    if (!isFocused) {
      setIsFocused(true);
    }
  };

  const { selectedIndex, inputRef, suggestionsRef, handleKeyDown } = useSearchKeyboardNavigation({
    setIsFocused,
    suggestions,
    onSelect: handleSuggestionClick,
    onSearch: () => onSearch(inputValue),
  });

  return (
    <div className={classNames(styles.searchBar, className)}>
      <div className={styles.inputWrapper}>
        <Input
          type="text"
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {isFocused && (
        <ul ref={suggestionsRef} className={styles.suggestions} role="listbox">
          {isLoading || error ? (
            <li className={styles.suggestion} role="option" aria-selected="false">
              Loading data...
            </li>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <li
                key={index}
                className={classNames(styles.suggestion, {
                  [styles.selected]: index === selectedIndex,
                })}
                onMouseDown={() => handleSuggestionClick(suggestion)}
                role="option"
                aria-selected={index === selectedIndex}
              >
                {suggestion}
              </li>
            ))
          ) : (
            <li className={styles.suggestion} role="option" aria-selected="false">
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default memo(LocationSearchBar);
