export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  // 日本語ロケールで年月日のフォーマッターを作成
  const formatter = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return formatter.format(date);
};
