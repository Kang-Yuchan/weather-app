export const getTemperatureColor = (temp: number, styles: { [key: string]: string }): string => {
  if (temp >= 35) return styles.scorching;
  if (temp >= 30) return styles.hot;
  if (temp >= 25) return styles.warm;
  if (temp >= 20) return styles.mild;
  if (temp >= 15) return styles.cool;
  if (temp >= 5) return styles.cold;
  return styles.freezing;
};
