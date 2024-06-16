class Expense {
  constructor(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  }

  calcPercentage(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  }

  getPercentage() {
    return this.percentage;
  }
}

class Income {
  constructor(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }
}

class BudgetController {
  constructor() {
    this.data = {
      allItems: {
        exp: [],
        inc: [],
      },
      totals: {
        exp: 0,
        inc: 0,
      },
      budget: 0,
      percentage: -1,
    };
  }

  calculateTotal(type) {
    let sum = 0;
    this.data.allItems[type].forEach((curr) => {
      sum += curr.value;
    });
    this.data.totals[type] = sum;
  }

  addItem(type, description, value) {
    let ID, newItem;
    const items = this.data.allItems[type];

    if (items.length > 0) {
      ID = items[items.length - 1].id + 1;
    } else {
      ID = 0;
    }

    if (type === "exp") {
      newItem = new Expense(ID, description, value);
    } else if (type === "inc") {
      newItem = new Income(ID, description, value);
    }

    this.data.allItems[type].push(newItem);
    return newItem;
  }

  deleteItem(type, id) {
    const ids = this.data.allItems[type].map((curr) => curr.id);
    const index = ids.indexOf(id);

    if (index !== -1) {
      this.data.allItems[type].splice(index, 1);
    }
  }

  calculateBudget() {
    this.calculateTotal("exp");
    this.calculateTotal("inc");

    this.data.budget = this.data.totals.inc - this.data.totals.exp;

    if (this.data.totals.inc > 0) {
      this.data.percentage = Math.round(
        (this.data.totals.exp / this.data.totals.inc) * 100
      );
    } else {
      this.data.percentage = -1;
    }
  }

  getBudget() {
    return {
      budget: this.data.budget,
      percentage: this.data.percentage,
      totalInc: this.data.totals.inc,
      totalExp: this.data.totals.exp,
    };
  }

  calculatePercentages() {
    this.data.allItems.exp.forEach((curr) => {
      curr.calcPercentage(this.data.totals.inc);
    });
  }

  getPercentages() {
    return this.data.allItems.exp.map((curr) => curr.getPercentage());
  }

  log() {
    console.log(this.data);
  }
}

export { BudgetController };
