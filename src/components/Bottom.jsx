function IncomeItem({ BudgetControllerItem, handleDeleteItemClick }) {
  return (
    <div class="income">
      <h2 class="icome__title">Income</h2>
      <div class="income__list">
        {BudgetControllerItem["inc"].map((item) => (
          <div class="item clearfix" id={`income-${item.id}`} key={item.id}>
            <div class="item__description">{item.description}</div>
            <div class="right clearfix">
              <div class="item__value">+ 💲{item.value}</div>
              <div
                class="item__delete"
                onClick={() => handleDeleteItemClick(item.id, "inc")}
              >
                <button class="item__delete--btn">
                  <i class="ion-ios-close-outline"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExpenseItem({ BudgetControllerItem, handleDeleteItemClick }) {
  return (
    <div class="expenses">
      <h2 class="expenses__title">Expenses</h2>

      <div class="expenses__list">
        {BudgetControllerItem["exp"].map((item) => (
          <div class="item clearfix" id={`expense-${item.id}`} key={item.id}>
            <div class="item__description">{item.description}</div>
            <div class="right clearfix">
              <div class="item__value">- 💲{item.value}</div>
              <div class="item__percentage">%{item.percentage}</div>
              <div
                class="item__delete"
                onClick={() => handleDeleteItemClick(item.id, "exp")}
              >
                <button class="item__delete--btn">
                  <i class="ion-ios-close-outline"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserInput({ onClickInput, formData, handleChange }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onClickInput(formData);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };
  return (
    <div className="add">
      <div className="add__container">
        <select
          className="add__type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="inc">+</option>
          <option value="exp">-</option>
        </select>
        <input
          type="text"
          className="add__description"
          name="description"
          placeholder="Add description"
          required="required"
          value={formData.description}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <input
          type="number"
          className="add__value"
          name="value"
          placeholder="Value"
          required="required"
          value={formData.value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button className="add__btn" onClick={handleSubmit}>
          <i className="ion-ios-checkmark-outline"></i>
        </button>
      </div>
    </div>
  );
}

export default function Bottom({
  handleInputSubmit,
  dataInput,
  handleInputChange,
  BudgetControllerItem,
  handleDeleteItem,
}) {
  return (
    <div class="bottom">
      <UserInput
        onClickInput={handleInputSubmit}
        formData={dataInput}
        handleChange={handleInputChange}
      />

      <div class="container clearfix">
        <IncomeItem
          BudgetControllerItem={BudgetControllerItem}
          handleDeleteItemClick={handleDeleteItem}
        />
        {/* <IncomeItem description="Sold car" value="1,500.00" /> */}
        <ExpenseItem
          BudgetControllerItem={BudgetControllerItem}
          handleDeleteItemClick={handleDeleteItem}
        />
        {/* <ExpenseItem description="Grocery shopping" value="435.28" /> */}
      </div>
    </div>
  );
}
