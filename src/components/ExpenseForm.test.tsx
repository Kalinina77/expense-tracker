import { render, screen, fireEvent } from "@testing-library/react";
import { ExpenseForm } from "./ExpenseForm.tsx";

describe("ExpenseForm", () => {
  it("кнопка добавить неактивна при пустой форме", () => {
    const mockAdd = jest.fn();
    render(<ExpenseForm onAdd={mockAdd} />);
    
    const submitButton = screen.getByText("Добавить");
    expect(submitButton).toBeDisabled();
  });

  it("показывает ошибку при пустом поле суммы после blur", () => {
    const mockAdd = jest.fn();
    render(<ExpenseForm onAdd={mockAdd} />);
    
    const amountInput = screen.getByPlaceholderText("Введите сумму");
    
    fireEvent.focus(amountInput);
    fireEvent.blur(amountInput);
    
    const errorMessage = screen.getByText("Введите сумму");
    expect(errorMessage).toBeInTheDocument();
  });
});
