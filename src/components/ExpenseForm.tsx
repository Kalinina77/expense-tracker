import React, { useMemo, useRef, useState } from "react";
import { CATEGORIES, CategoryId } from "../constants/categories.ts";
import type { Expense } from "../types/expense.ts";
import styles from './css/ExpenseForm.module.css'

type FormValues = {
  amount: string;
  category: string;
  description: string;
  date: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type Props = {
  onAdd: (expense: Omit<Expense, "id" | "createdAt">) => void;
};

const today = new Date().toISOString().slice(0, 10);

export const ExpenseForm: React.FC<Props> = ({ onAdd }) => {
  const [values, setValues] = useState<FormValues>({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    amount: false,
    category: false,
    description: false,
    date: false,
  });

  const amountRef = useRef<HTMLInputElement | null>(null);

  const validate = (v: FormValues): FormErrors => {
    const e: FormErrors = {};

    if (!v.amount.trim()) e.amount = "Введите сумму";
    else if (Number(v.amount) <= 0) e.amount = "Сумма должна быть больше 0";

    if (!v.category) e.category = "Выберите категорию";

    if (!v.description.trim()) e.description = "Введите описание";
    else if (v.description.trim().length < 3)
      e.description = "Минимум 3 символа";

    if (!v.date) e.date = "Выберите дату";
    else if (v.date > today) e.date = "Дата не может быть в будущем";

    return e;
  };

  const errors = useMemo(() => validate(values), [values]);
  const isValid = Object.values(errors).every((v) => !v);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      amount: true,
      category: true,
      description: true,
      date: true,
    });

    if (!isValid) return;

    onAdd({
      amount: Number(values.amount),
      category: values.category as CategoryId,
      description: values.description.trim(),
      date: values.date,
    });

    setValues({
      amount: "",
      category: "",
      description: "",
      date: "",
    });

    setTouched({
      amount: false,
      category: false,
      description: false,
      date: false,
    });

    amountRef.current?.focus();
  };

  return (
    <div className={styles.container_form}>
      <h2 className={styles.title}>Запишите свои расходы</h2>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <input
            ref={amountRef}
            name="amount"
            type="number"
            placeholder="Введите сумму"
            value={values.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            className={styles.input}
          />
          {touched.amount && errors.amount && (
            <p className={styles.error}>{errors.amount}</p>
          )}
        </div>

        <div className={styles.field}>
          <select
            name="category"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
            className={values.category === "" ? styles.select_placeholder : styles.select}
          >
            <option value="">Выберите категорию</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {touched.category && errors.category && (
            <p className={styles.error}>{errors.category}</p>
          )}
        </div>

        <div className={styles.field}>
          <input
            name="description"
            type="text"
            placeholder="Описание траты"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className={styles.input}
          />
          {touched.description && errors.description && (
            <p className={styles.error}>{errors.description}</p>
          )}
        </div>

        <div className={styles.field}>
          <input
            name="date"
            type="date"
            value={values.date}
            max={today}
            onChange={handleChange}
            onBlur={handleBlur}
            className={styles.input}
          />
          {touched.date && errors.date && <p className={styles.error}>{errors.date}</p>}
        </div>

        <button className={styles.button} type="submit" disabled={!isValid}>
          Добавить
        </button>
      </form>
    </div>
  );
};