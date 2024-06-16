import { useState } from "react";

import Top from "./components/Top";
import Bottom from "./components/Bottom";

import { BudgetController } from "./util/helper";

function getUserInfo() {
  const now = new Date();
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();
  const name = prompt("Enter your Name") || "User";

  return `Hello, ${name}! Available Budget in ${month} ${year}`;
}

const budgetController = new BudgetController();

const userInfo = getUserInfo();

function some() {
  const budgetController = new BudgetController();

  // Adding items
  budgetController.addItem("inc", "Salary", 2100);
  budgetController.addItem("exp", "Rent", 100);
  budgetController.addItem("exp", "Groceries", 435.28);

  // Calculating budget
  budgetController.calculateBudget();

  // Getting budget
  console.log(budgetController.getBudget());

  // Calculating percentages
  budgetController.calculatePercentages();
  console.log(budgetController.getPercentages());

  // Testing
  budgetController.log();
}

function App() {
  const [dataInput, SetDataInput] = useState({
    type: "inc",
    description: "",
    value: "",
  });
  const [isItemDeleted, setIsItemDeleted] = useState(false);
  function handleDeleteItem(itemId, type) {
    setIsItemDeleted((prev) => !prev);
    budgetController.deleteItem(type, itemId);
  }
  if (isItemDeleted) {
    budgetController.calculateBudget();
    budgetController.calculatePercentages();
    setIsItemDeleted(false);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    SetDataInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const handleInputSubmit = (data) => {
    if (data.description === "") {
      alert("Please enter a description.");
      return;
    }

    if (isNaN(parseFloat(data.value)) || parseFloat(data.value) <= 0) {
      alert("Please enter a valid positive number for the value.");
      return;
    }
    budgetController.addItem(
      data.type,
      data.description,
      parseFloat(data.value)
    );
    budgetController.calculateBudget();
    budgetController.calculatePercentages();
    SetDataInput({
      type: data.type,
      description: "",
      value: "",
    });
  };
  return (
    <>
      <Top
        totalBudgetController={budgetController.getBudget()}
        userInfo={userInfo}
      />
      <Bottom
        handleInputSubmit={handleInputSubmit}
        dataInput={dataInput}
        handleInputChange={handleInputChange}
        BudgetControllerItem={budgetController.data.allItems}
        handleDeleteItem={handleDeleteItem}
      />
    </>
  );
}

export default App;
