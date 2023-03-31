import React, { useState } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

// const dummyExpenses = [
//   {
//     id: "001",
//     title: "Car Insurance",
//     amount: 150,
//     date: new Date(2021, 2, 28),
//   },
//   {
//     id: "002",
//     title: "Bike Insurance",
//     amount: 250,
//     date: new Date(2021, 5, 28),
//   },
//   {
//     id: "003",
//     title: "Cycle Insurance",
//     amount: 350,
//     date: new Date(2021, 2, 28),
//   },
//   {
//     id: "004",
//     title: "Boat Insurance",
//     amount: 450,
//     date: new Date(2021, 2, 28),
//   },
// ];

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const addExpenseHandler = (expense) => {
    // console.log(expense);
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  return (
    <div>
      {/* <h2>Let's get started!</h2> */}
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
};

export default App;
