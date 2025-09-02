import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/transactions")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);
  const addTransaction = (transaction) => {
    const positiveAmount = Math.abs(transaction.amount);

    axios
      .post("http://localhost:8080/api/transactions", {
        ...transaction,
        amount: positiveAmount,
      })
      .then((res) => setTransactions([...transactions, res.data]))
      .catch((err) => console.error("Error adding transaction:", err));
  };
  const deleteTransaction = (id) => {
    axios
      .delete(`http://localhost:8080/api/transactions/${id}`)
      .then(() =>
        setTransactions(transactions.filter((t) => t.id !== id))
      )
      .catch((err) => console.error("Error deleting transaction:", err));
  };
  const totalBalance = transactions.reduce((acc, t) => {
    if (!t.type) return acc;
    return t.type === "INCOME" ? acc + t.amount:acc - t.amount;
  }, 0);
  return (
    <div className="app-container">
      <h1>💰Expense Tracker</h1>
     <h2>
        Balance: ₹{totalBalance >= 0 ? totalBalance : `-${Math.abs(totalBalance)}`}
      </h2>
      <TransactionForm onAddTransaction={addTransaction} />
      <TransactionList
        transactions={transactions}
        onDeleteTransaction={deleteTransaction}
      />
       <Dashboard transactions={transactions} />
    </div>
  );
}
export default App;
