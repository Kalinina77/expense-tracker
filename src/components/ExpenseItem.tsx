import React from "react";
import type { Expense } from "../types/expense.ts";
import { formatAmount, formatDate } from "../utils/formatters.ts";
import { getCategoryName } from "../utils/categories.ts";


type Props = {
  expense: Expense;
  onDelete: (id: string) => void;
};

export const ExpenseItem: React.FC<Props> = ({ expense, onDelete }) => {
  return (
    <tr>
      <td>{formatDate(expense.date)}</td>
      <td>{getCategoryName(expense.category)}</td>
      <td>{expense.description}</td>
      <td>{formatAmount(expense.amount)}</td>
      <td>
        <button onClick={() => onDelete(expense.id)}
          aria-label="Удалить расход" title="Удалить">
          ×
        </button>
      </td>
    </tr>
  );
};