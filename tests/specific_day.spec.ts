import { test, expect } from '@playwright/test';

test('specific day page displays correct information', async ({ page }) => {
  // 特定の日付のURLに直接アクセス
  await page.goto('/specific_day/Tokyo/2024-10-10');

  // ページタイトルを確認
  const title = page.getByTestId('page-title');

  await expect(title).toHaveText(/2024年10月10日/);

  // 地名が表示されていることを確認
  await expect(page.getByText('Tokyo, Japan')).toBeVisible();

  // 特定の日の天気情報が表示されていることを確認
  await expect(page.getByTestId('specific-day-weather')).toBeVisible();

  // 日付が正しく表示されていることを確認
  await expect(page.getByText('2024年10月10日')).toBeVisible();
});

test('search functionality on specific day page', async ({ page }) => {
  await page.goto('/specific_day/Tokyo/2024-10-10');

  // 検索バーに新しい地名を入力
  await page.getByPlaceholder('地名で検索').fill('New York');
  await page.getByPlaceholder('地名で検索').press('Enter');

  // URLが更新されたことを確認
  await expect(page).toHaveURL(/\/specific_day\/New%20York\/2024-10-10/);

  // 新しい地名の天気情報が表示されていることを確認
  await expect(page.getByText('New York')).toBeVisible();
  await expect(page.getByTestId('specific-day-weather')).toBeVisible();
});

test('navigation between dates', async ({ page }) => {
  await page.goto('/specific_day/Tokyo/2024-10-10');

  // 翌日のボタンをクリック（存在する場合）
  const nextDayButton = page.getByRole('button', { name: '翌日' });
  if (await nextDayButton.isVisible()) {
    await nextDayButton.click();
    await expect(page).toHaveURL(/\/specific_day\/Tokyo\/2024-10-11/);
  }

  // 前日のボタンをクリック（存在する場合）
  const prevDayButton = page.getByRole('button', { name: '前日' });
  if (await prevDayButton.isVisible()) {
    await prevDayButton.click();
    await expect(page).toHaveURL(/\/specific_day\/Tokyo\/2024-10-09/);
  }
});

test('display of detailed weather information', async ({ page }) => {
  await page.goto('/specific_day/Tokyo/2024-10-10');

  await expect(page.getByTestId('specific-day-weather')).toBeVisible();

  // 1日の概要セクションの確認
  const dayDetails = page.getByTestId('day-details');
  await expect(dayDetails).toBeVisible();
  await expect(dayDetails.getByText('最高気温 (°C):')).toBeVisible();
  await expect(dayDetails.getByText('最低気温 (°C):')).toBeVisible();
  await expect(dayDetails.getByText('平均気温 (°C):')).toBeVisible();
  await expect(dayDetails.getByText('最大風速 (km/h):')).toBeVisible();
  await expect(dayDetails.getByText('総降水量 (mm):')).toBeVisible();
  await expect(dayDetails.getByText('降雪量 (cm):')).toBeVisible();
  await expect(dayDetails.getByText('平均湿度:')).toBeVisible();
  await expect(dayDetails.getByText('降水確率:')).toBeVisible();
  await expect(dayDetails.getByText('降雪確率:')).toBeVisible();
  await expect(dayDetails.getByText('平均視界 (km):')).toBeVisible();
  await expect(dayDetails.getByText('紫外線指数:')).toBeVisible();

  // 天文情報セクションの確認
  const astroDetails = page.getByTestId('astro-details');
  await expect(astroDetails).toBeVisible();
  await expect(astroDetails.getByText('日の出:')).toBeVisible();
  await expect(astroDetails.getByText('日の入り:')).toBeVisible();
  await expect(astroDetails.getByText('月の出:')).toBeVisible();
  await expect(astroDetails.getByText('月の入り:')).toBeVisible();
  await expect(astroDetails.getByText('月相:')).toBeVisible();
  await expect(astroDetails.getByText('月の輝度:')).toBeVisible();

  // 時間ごとの詳細セクションの確認
  const hourlyDetails = page.getByTestId('hourly-details');
  await expect(hourlyDetails.getByText('時間ごとの詳細')).toBeVisible();

  // 時間をクリックして選択時間の詳細を表示
  const selectedHourDetails = page.getByTestId('selected-hour-details');
  await selectedHourDetails.getByText('00:00').click();
  await expect(selectedHourDetails).toBeVisible();
  await expect(selectedHourDetails.getByText('気温 (°C):')).toBeVisible();
  await expect(selectedHourDetails.getByText('体感温度 (°C):')).toBeVisible();
  await expect(selectedHourDetails.getByText('湿度:')).toBeVisible();
  await expect(selectedHourDetails.getByText('風速 (km/h):')).toBeVisible();
  await expect(selectedHourDetails.getByText('風向:')).toBeVisible();
  await expect(selectedHourDetails.getByText('降水量 (mm):')).toBeVisible();
  await expect(selectedHourDetails.getByText('降水確率:')).toBeVisible();
  await expect(selectedHourDetails.getByText('視界 (km):')).toBeVisible();
  await expect(selectedHourDetails.getByText('紫外線指数:')).toBeVisible();
});
