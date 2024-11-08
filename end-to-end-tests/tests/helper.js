const startReport = async (page) => {
  await page.getByRole('button', { name: 'Start Expense Report' }).click()
}

export { startReport }
