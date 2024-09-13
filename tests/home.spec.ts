import { test, expect } from '@playwright/test';

test('home page has title and search bar', async ({ page }) => {
  await page.goto('/');

  // タイトルをチェック
  const title = page.getByTestId('page-title');

  await expect(title).toHaveText(/天気アプリケーション/);

  // 検索バーが存在することを確認
  const searchBar = page.getByRole('textbox');
  await expect(searchBar).toBeVisible();
});

test('search for weather information', async ({ page }) => {
  await page.goto('/');

  const searchBar = page.getByRole('textbox');
  // 検索バーに入力
  await searchBar.fill('Tokyo');
  await searchBar.press('Enter');

  // 結果が表示されるのを待つ
  await expect(page.getByText('Tokyo, Japan')).toBeVisible();

  // 現在の天気情報が表示されていることを確認
  await expect(page.getByTestId('current-weather')).toBeVisible();

  // 予報が表示されていることを確認
  await expect(page.getByTestId('forecast-weather')).toBeVisible();
});

test('navigate to specific day forecast', async ({ page }) => {
  await page.goto('/');

  // 検索を実行
  await page.getByPlaceholder('地名または緯度,経度で検索').fill('Tokyo');
  await page.getByPlaceholder('地名または緯度,経度で検索').press('Enter');

  // 予報の日付をクリック（例：3日後の予報）
  await page.getByTestId('forecast-day-3').click();

  // 特定の日の予報ページに遷移したことを確認
  await expect(page).toHaveURL(/\/specific_day\/Tokyo\/\d{4}-\d{2}-\d{2}/);

  // 特定の日の天気情報が表示されていることを確認
  await expect(page.getByTestId('specific-day-weather')).toBeVisible();
});
