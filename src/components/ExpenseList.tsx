import React from "react";
import { ExpenseItem } from "./ExpenseItem.tsx";
import type { Expense } from "../types/expense.ts";
import styles from './css/ExpenseList.module.css';

type Props = {
  expenses: Expense[];
  onDelete: (id: string) => void;
};

export const ExpenseList: React.FC<Props> = ({ expenses, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <section className={styles.section}>
        <h2 className={styles.title}>Список расходов</h2>
        <p className={styles.text}>Нет расходов</p>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Список расходов</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Категория</th>
            <th>Описание</th>
            <th>Сумма</th>
            <th>Удаление</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((e) => (
            <ExpenseItem key={e.id} expense={e} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </section>
  );
};