import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { CATEGORIES } from "../constants/categories.ts";
import type { Expense } from "../types/expense.ts";
import styles from './css/CategoryPieChart.module.css';

type CategoryPieChartProps = {
  expenses: Expense[];
};

type PieDataItem = {
  name: string;
  value: number;
};

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ expenses }) => {
  const data: PieDataItem[] = useMemo(() => {
    const byCategory: Record<string, number> = {};

    for (const e of expenses) {
      byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
    }

    return CATEGORIES
      .map((cat) => ({
        name: cat.name,
        value: byCategory[cat.id] || 0,
      }))
      .filter((item) => item.value > 0); 
  }, [expenses]);

  if (data.length === 0) {
    return null; 
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Диаграмма расходов по категориям</h2>
      <div className={styles.chart_container}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
                formatter={(value) =>
                    new Intl.NumberFormat("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                    maximumFractionDigits: 0,
                    }).format(Number(value))
                }
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};