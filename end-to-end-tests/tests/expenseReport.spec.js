import { test, expect, beforeEach, describe } from '@playwright/test'
import { startReport } from './helper'

describe('Expense Report app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await page.goto('/')
  })

  test('Settings button is shown', async ({ page }) => {
    const settingsButton = page.getByText('settings')
    await expect(settingsButton).toBeVisible()
  })

  test('a new report can be created', async ({ page }) => {
    await startReport(page)
    const projectsHeader = page.getByText('Project').last()
    await expect(projectsHeader).toBeVisible()
  })
})
