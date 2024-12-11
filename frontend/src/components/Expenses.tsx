/**
 * @file Expenses.tsx - ./frontend/src/components
 * @description The `Expenses` component manages a list of expenses related to a specific project. It allows users to view, add, update, and delete expenses efficiently. This component handles expense state management and integrates with the `Expense` sub-component to render individual expense entries.
 * @author matthewb
 * @date Created: 2024-09-30 | Last Modified: 2024-10-02
 * @version 1.0.0
 * @license MIT
 * @usage This component is intended to be used within the context of a project management application. It should receive a `project` object, a list of `expenses`, and a handler function for updating expenses. Example usage:
 *        `<Expenses project={selectedProject} expenses={selectedProject.expenses} handleExpensesChange={handleExpensesChange} />`
 * @dependencies React for building the component and managing state, `uuid` for generating unique IDs for new expenses, and the `Expense` component for rendering individual expense items.
 * @relatedFiles Related files include `Expense.tsx`, which defines the structure and functionality of individual expense items, and `ExpenseReport.tsx`, which may utilize this component to manage expenses for the selected project.
 */

import React from 'react'
import Expense from './Expense'
import {
  CostCodeDropdownType,
  ExpenseType,
  ProjectType,
  ReportType,
} from '../data/types'
import expensesService from '../services/expensesService'
import Button from './Button'
import { Subtext, Subtitle, Text, Title } from './Text'
import Container from './Container'

interface ExpensesProps {
  report: ReportType
  project: ProjectType
  expenses: ExpenseType[]
  costCodes: CostCodeDropdownType[]
  handleExpensesChange: (updatedExpenses: ExpenseType[]) => void
}

const Expenses: React.FC<ExpensesProps> = ({
  report,
  project,
  expenses,
  costCodes,
  handleExpensesChange,
}) => {
  const handleExpenseChange = (updatedExpense: ExpenseType) => {
    const updatedExpenses: ExpenseType[] | undefined = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    )
    handleExpensesChange(updatedExpenses)
  }

  const handleAddExpense = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!report.id) return

    const newExpense: ExpenseType = {
      id: '',
      date: '',
      costCategory: '',
      costCode: '',
    }

    expensesService
      .create(report.id, project.id, newExpense)
      .then((createdExpense: ExpenseType) => {
        const updatedExpenses = expenses.concat(createdExpense)
        handleExpensesChange(updatedExpenses)
      })
      .catch((error: unknown) => {
        console.log(error)
      })
  }

  const handleDeleteExpense = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault()
    const updatedExpenses: ExpenseType[] | undefined = expenses.filter(
      (expense) => expense.id !== id
    )
    handleExpensesChange(updatedExpenses)
  }

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <Title text="Expenses" />
        <Subtitle text={project.name} />
      </div>
      {expenses.map((expense) => (
        <Expense
          key={expense.id}
          expense={expense}
          costCodes={costCodes}
          handleExpenseChange={handleExpenseChange}
          handleDeleteExpense={handleDeleteExpense}
        />
      ))}

      {expenses.length === 0 && (
        <Container className="flex-grow-0 h-fit">
          <Text text="There are no expenses associated with this project..." />
          <Subtext text="Add an expense with the button below" />
        </Container>
      )}

      <div className="flex justify-center">
        <Button
          className="w-full md:w-fit"
          text="Add Expense"
          onClick={(event) => {
            handleAddExpense(event)
          }}
        />
      </div>
    </div>
  )
}

export default Expenses
