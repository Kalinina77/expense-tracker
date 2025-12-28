import React from "react";
import "./App.css";
import { ExpenseForm } from "./components/ExpenseForm.tsx";
import { ExpenseList } from "./components/ExpenseList.tsx";
import { Summary } from "./components/Summary.tsx";
import { useLocalStorage } from "./hook/useLocalStorage.ts";
import type { Expense } from "./types/expense.ts";

export default function App() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>("expenses", []);

  const handleAdd = (data: Omit<Expense, "id" | "createdAt">) => {
    setExpenses((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...data,
      },
    ]);
  };

  const handleDelete = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="App">
      <h1 className="app_title">Expense Tracker</h1>
      <ExpenseForm onAdd={handleAdd} />
      <ExpenseList expenses={expenses} onDelete={handleDelete} />
      <Summary expenses={expenses} />
    </div>
  );
}