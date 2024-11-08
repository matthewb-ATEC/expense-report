import { test, expect } from '@playwright/test'
import { beforeEach, describe } from 'node:test'
import { startReport } from './helper'

describe('Expense Report app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await page.goto('/')
  })

  test('Expense report button is shown', async ({ page }) => {
    const expenseReportButton = page.getByText('Expense Report')
    await expect(expenseReportButton).toBeVisible()
  })

  test('Settings button is shown', async ({ page }) => {
    const settingsButton = page.getByText('settings')
    await expect(settingsButton).toBeVisible()
  })

  test('a new report can be created', async ({ page }) => {
    await startReport(page)
    const projectsHeader = page.getByText('Projects')
    await expect(projectsHeader).toBeVisible()
  })
})
