import React, { useMemo, useState } from "react";
import { ExpenseItem } from "./ExpenseItem.tsx";
import type { Expense } from "../types/expense.ts";
import { CATEGORIES, CategoryId } from "../constants/categories.ts";
import styles from './css/ExpenseList.module.css';

type Props = {
  expenses: Expense[];
  onDelete: (id: string) => void;
};

export const ExpenseList: React.FC<Props> = ({ expenses, onDelete }) => {
  const [categoryFilter, setCategoryFilter] = useState<"all" | CategoryId>("all");

  const sorted = useMemo(
    () => [...expenses].sort((a, b) => b.date.localeCompare(a.date)),
    [expenses]
  );

  const filtered = useMemo(
    () =>
      sorted.filter((e) => {
        if (categoryFilter === "all") return true;
        return e.category === categoryFilter;
      }),
    [sorted, categoryFilter]
  );

  if (filtered.length === 0) {
    return (
      <section className={styles.section}>
        <h2 className={styles.title}>Список расходов</h2>

        <div className={styles.filter_wrapper}>
          <label htmlFor="category-filter" className={styles.text}>
            Фильтр по категории:
          </label>
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(
                e.target.value === "all"
                  ? "all"
                  : (e.target.value as CategoryId)
              )
            }
            className={styles.select}
          >
            <option value="all">Все категории</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <p className={styles.text}>Нет расходов</p>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Список расходов</h2>

      <div className={styles.filter_wrapper}>
        <label htmlFor="category-filter" className={styles.text}>
          Фильтр по категории:
        </label>
        <select
          id="category-filter"
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(
              e.target.value === "all"
                ? "all"
                : (e.target.value as CategoryId)
            )
          }
          className={styles.select}
        >
          <option value="all">Все категории</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

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
          {filtered.map((e) => (
            <ExpenseItem key={e.id} expense={e} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </section>
  );
};