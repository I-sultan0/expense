import React, { useState, useEffect } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import { loginActions } from "./Store/login";
import { useDispatch } from "react-redux";

const AllExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const userPresent = localStorage.getItem("username");
    if (userPresent) {
      dispatch(loginActions.isUserPresent({ user: userPresent }));
    }
  }, [dispatch]);

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

export default AllExpense;
