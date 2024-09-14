import { getTemperatureColor } from '../temperatureUtils';

describe('getTemperatureColor', () => {
  const mockStyles = {
    scorching: 'scorching-class',
    hot: 'hot-class',
    warm: 'warm-class',
    mild: 'mild-class',
    cool: 'cool-class',
    cold: 'cold-class',
    freezing: 'freezing-class',
  };

  it('returns correct class for different temperatures', () => {
    expect(getTemperatureColor(36, mockStyles)).toBe('scorching-class');
    expect(getTemperatureColor(32, mockStyles)).toBe('hot-class');
    expect(getTemperatureColor(27, mockStyles)).toBe('warm-class');
    expect(getTemperatureColor(22, mockStyles)).toBe('mild-class');
    expect(getTemperatureColor(17, mockStyles)).toBe('cool-class');
    expect(getTemperatureColor(7, mockStyles)).toBe('cold-class');
    expect(getTemperatureColor(2, mockStyles)).toBe('freezing-class');
  });

  it('handles missing style properties gracefully', () => {
    const incompleteStyles = { hot: 'hot-class' };
    expect(getTemperatureColor(36, incompleteStyles)).toBe(undefined);
    expect(getTemperatureColor(32, incompleteStyles)).toBe('hot-class');
    expect(getTemperatureColor(2, incompleteStyles)).toBe(undefined);
  });
});
