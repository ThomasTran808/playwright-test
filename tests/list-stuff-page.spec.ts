import { test, expect } from './auth-utils';

test.slow();
test('List Stuff Page', async ({ getUserPage }) => {
  const page = await getUserPage('john@foo.com', 'changeme');

  await page.goto('http://localhost:3000/list');

  // Check the page heading
  await expect(page.getByRole('heading', { name: 'Stuff' })).toBeVisible({ timeout: 10000 });

  // Check navbar links
  await expect(page.getByRole('link', { name: 'Next.js Application Template' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Add Stuff' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'List Stuff' })).toBeVisible();

  // Check logged-in user
  await expect(page.getByRole('button', { name: 'john@foo.com' })).toBeVisible();

  // Check table renders
  await expect(page.locator('table')).toBeVisible();

  // Check table headers
  await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Quantity' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Condition' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Actions' })).toBeVisible();

  // Check seeded data
  await expect(page.getByRole('cell', { name: 'Basket' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Bicycle' })).toBeVisible();
});