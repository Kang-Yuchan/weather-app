import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import styles from './index.module.scss';
import Input from './index';

describe('Input Component', () => {
  // Input コンポーネントが正しくレンダリングされてるか
  it('renders an input element', () => {
    render(<Input />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });
  // class名を親から受け取って正しく反映されてるか
  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<Input className={customClass} />);
    const inputWrapper = screen.getByRole('textbox').parentElement;
    expect(inputWrapper).toHaveClass(customClass);
  });
  // forwardsRefがInputに正しく機能しているか
  it('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
  // placeholderがInputに正しく適用されてるか
  it('placeholder to input element', () => {
    const placeholder = 'Enter text';
    render(<Input placeholder={placeholder} />);
    const inputElement = screen.getByPlaceholderText(placeholder);
    expect(inputElement).toBeInTheDocument();
  });
  // onChnageのイベントハンドラーが正しく機能しているか
  it('handles onChange event', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
  // sassのmoduleスタイルが正しく反映されているか
  it('applies styles from sass module', () => {
    render(<Input />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass(styles.input);
  });
});
