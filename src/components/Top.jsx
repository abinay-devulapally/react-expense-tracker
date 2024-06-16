export default function Top({ totalBudgetController, userInfo }) {
  return (
    <div className="top">
      <div class="budget">
        <div class="budget__title">
          <span class="budget__title--month">{userInfo}</span>:
        </div>

        <div class="budget__value">
          {totalBudgetController["budget"] > 0 ? "+" : ""}💲
          {parseFloat(totalBudgetController.budget.toFixed(2))}
        </div>

        <div class="budget__income clearfix">
          <div class="budget__income--text">Income</div>
          <div class="right">
            <div class="budget__income--value">
              + 💲{parseFloat(totalBudgetController.totalInc.toFixed(2))}
            </div>
            <div class="budget__income--percentage">&nbsp;</div>
          </div>
        </div>

        <div class="budget__expenses clearfix">
          <div class="budget__expenses--text">Expenses</div>
          <div class="right clearfix">
            <div class="budget__expenses--value">
              - 💲{parseFloat(totalBudgetController.totalExp.toFixed(2))}
            </div>
            <div class="budget__expenses--percentage">
              {totalBudgetController.percentage}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
