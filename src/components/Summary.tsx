import React, { useMemo } from "react";
import type { Expense } from "../types/expense.ts";
import { CATEGORIES } from "../constants/categories.ts";
import { formatAmount } from "../utils/formatters.ts";
import styles from './css/Summary.module.css';

type Props = {
  expenses: Expense[];
};

export const Summary: React.FC<Props> = ({ expenses }) => {
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  const byCategory = useMemo(() => {
    const m: Record<string, number> = {};
    for (const e of expenses) {
      m[e.category] = (m[e.category] || 0) + e.amount;
    }
    return m;
  }, [expenses]);

  return (
    <section className={styles.section}>

      <p className={styles.subtitle}>
        Всего потрачено: {formatAmount(total)}
      </p>

      {Object.keys(byCategory).length > 0 && (
        <>
          <h3 className={styles.categories}>По категориям:</h3>
          <ul className={styles.list}>
            {Object.entries(byCategory).map(([catId, sum]) => {
              const name = CATEGORIES.find((c) => c.id === catId)?.name;
              return (
                <li key={catId}>
                  {name}: {formatAmount(sum)}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
};