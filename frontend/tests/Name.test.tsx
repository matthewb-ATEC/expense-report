import React from 'react'
import { render, screen } from '@testing-library/react'
import Name from '../src/components/Name'
import { ReportType } from '../src/data/types'
import { vi, test, expect } from 'vitest'

test('renders content', () => {
  const report: ReportType = { id: '0', user: { name: '' }, projects: [] }

  const mockHandler = vi.fn()

  render(<Name report={report} handleReportChange={mockHandler} />)

  const element = screen.getByText('User Information')
  expect(element).toBeDefined()
})
