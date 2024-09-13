import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailItem from '@/components/ui/DetailItem';

describe('DetailItem Component', () => {
  // DetailItem コンポーネントが正しくレンダリングされているか
  it('renders the label and value correctly', () => {
    const detail = { label: 'Test Label', value: 'Test Value' };
    render(<DetailItem datail={detail} />);
    expect(screen.getByText('Test Label:')).toBeInTheDocument();
    expect(screen.getByText('Test Value')).toBeInTheDocument();
  });

  // unit が正しく表示されているか
  it('renders the unit when provided', () => {
    const detail = { label: 'Weight', value: 75, unit: 'kg' };
    render(<DetailItem datail={detail} />);
    expect(screen.getByText('kg')).toBeInTheDocument();
  });

  // カスタムclassNameが適用されているか
  it('applies custom className', () => {
    const detail = { label: 'Test', value: 'Value' };
    const customClass = 'custom-class';
    render(<DetailItem datail={detail} className={customClass} />);
    const detailItemElement = screen.getByText('Test:').closest('div');
    expect(detailItemElement).toHaveClass(customClass);
  });

  // 数値型の value が正しく表示されているか
  it('renders numeric values correctly', () => {
    const detail = { label: 'Score', value: 100 };
    render(<DetailItem datail={detail} />);
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});
